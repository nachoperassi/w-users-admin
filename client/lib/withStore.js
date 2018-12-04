import { initializeStore } from '../store';
import axios from 'axios';
import moment from 'moment';

const isServer = typeof window === 'undefined';
const NEXT_REDUX_STORE = 'NEXT_REDUX_STORE';

// get or create redux store depending on whether it's running on the client or the server
function getOrCreateStore (initialState) {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[NEXT_REDUX_STORE]) {
    window[NEXT_REDUX_STORE] = initializeStore(initialState)
  }

  return window[NEXT_REDUX_STORE];
}

const withStore = (App) => (
  class AppWithStore extends React.Component {
    static async getInitialProps(appContext) {
      const response = await axios.get('http://localhost:3000/api/people');
      const users = response.data.map((user) => (
        { ...user, birthdate: moment(user.birthdate).format('YYYY-MM-DD')}
      ));

      const reduxStore = getOrCreateStore({ users });

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App reduxStore={this.reduxStore} {...this.props} />
    }
  }
)

export default withStore;