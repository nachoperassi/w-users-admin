import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

// ACTIONS
export const selectUser = (id) => {
  return { 
    type: 'SELECT_USER',
    id
  }
}
export const unselectUser = (id) => {
  return { 
    type: 'UNSELECT_USER',
    id
  }
}
export const editOrCreateUser = (user) => {
  return async (dispatch) => {
    if (user.id) {
      const { id, ...data } = user;
      const res = await axios.put(`http://localhost:3000/api/people/${id}`, data);
      user = res.data;
    } else {
      const res = await axios.post(`http://localhost:3000/api/people`, user);
      user = res.data;
    }  
    return dispatch(upsertUser(user));
  }
}
const upsertUser = (user) => {
  return {
    type: 'UPSERT_USER',
    user
  }
}
export const deleteUsers = (ids) => {
  return (dispatch) => {
    ids.forEach(async (id) => {
    await axios.delete(`http://localhost:3000/api/people/${id}`);
    return dispatch(removeUser(id));
  });
  }
}
const removeUser = (id) => {
  return {
    type: 'REMOVE_USER',
    id
  }
}

// REDUCERS
const usersReducer = (users = [], action) => {
  switch (action.type) {    
    case 'UPSERT_USER':
      const newUser = action.user;
      const otherUsers = users.filter((user) => 
        user.id != newUser.id
      );
      return [
          ...otherUsers,
          newUser
      ]
    
    case 'REMOVE_USER':
      return users.filter((user) => (
        user.id !== action.id
      ));

    default:
      return users
  }
}

const selectedUsersReducer = (selectedUsers = [], action) => {
  switch (action.type) {
    case 'SELECT_USER':
      if (selectedUsers.includes(action.id)) return selectedUsers;
      const response = [
        ...selectedUsers, 
        action.id
      ];
      return [
        ...selectedUsers, 
        action.id
      ]
    
    case 'UNSELECT_USER':
      if (!selectedUsers.includes(action.id)) return selectedUsers;
      return selectedUsers.filter((id) => {
          return id !== action.id;
        })

    default:
      return selectedUsers
  }
}

const rootReducer = combineReducers({
  users: usersReducer,
  selectedUsers: selectedUsersReducer,
  form: formReducer
})

export function initializeStore(initialState = mockInitialState) {
  return createStore(rootReducer, initialState, applyMiddleware(ReduxThunk));
}