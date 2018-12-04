// actions
import { selectUser, unselectUser, deleteUsers } from '../store';
// functions
import { connect } from 'react-redux';
// hooks
import { useState } from 'react';
// components
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import TableToolbar from '../components/tableToolbar';
import Link from 'next/link';

const styles = theme => ({
  paper: {
    maxWidth: '1000px',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
  },
});

const Users = (props) => {
  const [ searchTerm, setSearchTerm ] = useState('');
  
  const { dispatch, users, selectedUsers, classes } = props;

  const handleRowClick = (id) => {
    if (isUserSelected(id)) {
      dispatch(unselectUser(id));
    } else {
      dispatch(selectUser(id));
    }
  }

  const isUserSelected = id => props.selectedUsers.indexOf(id) !== -1; 

  const handleDelete = (users) => {
    console.log('OK');
    dispatch(deleteUsers(users));
  }

  return (
    <Paper className={classes.paper}>
      <TableToolbar selectedUsers={selectedUsers} handleDelete={handleDelete}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table>
        <TableBody>
          {users.filter((user) => (
            user.firstname.includes(searchTerm)
          )).map((user) => {
            const isSelected = isUserSelected(user.id);
            return (
              <TableRow
                hover
                onClick={event => handleRowClick(user.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={user.id}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={isSelected}
                    /*onChange={(event, checked) => handleCheckboxChange(checked, user.id)}*/  
                  />
                </TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

const mapStateToProps = (state) => {
  const { users, selectedUsers } = state;
  return { users, selectedUsers };
}

export default connect(mapStateToProps)(withStyles(styles)(Users));