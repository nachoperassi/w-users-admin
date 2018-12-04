// components
import FormField from './formField';
// material-ui components
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// redux-form
import { Field, reduxForm } from 'redux-form'

const styles = theme => ({
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
  button: {
    margin: theme.spacing.unit,
    height: '50px',
    width: '100px',
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

function Form (props) {
  const { classes, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.fieldsWrapper}>
        <Field name="firstname" label="First name" 
          className={classes.margin} type="text" component={FormField}
        />
        <Field name="lastname" label="Last name" 
          className={classes.margin} type="text" component={FormField}
        />
        <Field name="email" label="Email" 
          className={classes.margin} component={FormField}
        />
        <Field name="birthdate" label="Birthdate"
          className={classes.margin} type="date" component={FormField}
        />
        <Field name="country" label="Country" 
          className={classes.margin} type="text" component={FormField}
        />
        <Field name="phone" label="Phone" 
          className={classes.margin} type="number" component={FormField}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Save
        </Button>
      </div>
    </form>
  );
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstname',
    'lastname',
    'email',
    'birthdate',
    'phone',
    'country'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
    if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

Form = reduxForm({
  form: 'user',
  validate
})(Form)

export default withStyles(styles)(Form);