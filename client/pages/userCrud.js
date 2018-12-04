// components
import Form from '../components/form';
// material-ui components
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
// routing
import Link from 'next/link'
import Router from 'next/router'
import { withRouter } from 'next/router';
// functions - helpers
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
// actions
import { editOrCreateUser } from '../store';

const styles = theme => ({
  paper: {
    maxWidth: '1000px',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
  },
  bar: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fieldsWrapper: {
    width: '100%',
    textAlign: 'center'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  },
  buttonWrapper: {
    width: '100%',
    textAlign: 'right',
  },
  button: {
    margin: theme.spacing.unit,
    height: '50px',
    width: '100px',
  }
});

const userCrud = (props) => {
  const { dispatch, classes, user } = props;
  
  const handleSubmit = (user) => {
    dispatch(editOrCreateUser(user));
    Router.push('/');
  }

  return (
    <Paper className={classes.paper}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {user.id ? 'Edit' : 'Create'} user
          </Typography>
          <div className={classes.grow} />
          <Link href={`/users`}>
            <IconButton color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Form onSubmit={handleSubmit} initialValues={user || {}} />
    </Paper>
  );
}

userCrud.getInitialProps = async function (context) {
  if (!context.query.id) {
    return { 
      user: {
        birthdate: moment().format('YYYY-MM-DD')
      }
    }
  }
  const { id } = context.query;
  const res = await axios.get(`http://localhost:3000/api/people/${id}`);
  const user = res.data;
  user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');

  return { user }
}

export default connect()
  (withStyles(styles)
  (withRouter(userCrud)));