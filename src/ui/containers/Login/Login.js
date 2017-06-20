import React, { 
  PropTypes 
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  push,
} from 'react-router-redux';
import { 
  propTypes, 
  reduxForm, 
  Field,
} from 'redux-form';
import {
  login,
} from '../../../redux/actions';
import {
  HOME_ROUTE,
  AUTH_LOGIN_ROUTE,
} from '../../../common';
import compose from 'recompose/compose';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { 
  Card, 
  CardActions,
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import defaultTheme from '../defaultTheme';

import TextInput from '../../components/TextInput';
import CustomerTypeSelector from '../../components/CustomerTypeSelector';
const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',  
  },

  card: {
    minWidth: 300,
  },

  avatar: {
    margin: '1em',
    textAlign: 'center',
  },

  form: {
    padding: '0 1em 1em 1em'
  },

  input: {
    display: 'flex',
  },
};

const prefixedStyles = {};

export class  Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSelectCustomerTypeView:true
    }
  }
  render(){
    const { 
    handleSubmit, 
    onSubmit, 
    onSubmitCustomerType,
    submitting, 
    theme 
  } = this.props;
  
  const muiTheme = getMuiTheme(theme);
  if (!prefixedStyles.main) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.body = prefix(styles.body);
    prefixedStyles.card = prefix(styles.card);
    prefixedStyles.avatar = prefix(styles.avatar);
    prefixedStyles.form = prefix(styles.form);
    prefixedStyles.input = prefix(styles.input);
  }
  if(this.state.showSelectCustomerTypeView){
    return (
      <div style={prefixedStyles.body}>
      <Card style={prefixedStyles.card}>
        <div style={prefixedStyles.avatar}>SELECT AMONG THE TWO CHOICES BELOW? </div>
        <div>YOU ARE A :</div>
          <div style={prefixedStyles.form}>
            <div style={prefixedStyles.input}>
              <CustomerTypeSelector onChange={(value)=>{
                   this.setState({
                     showSelectCustomerTypeView:false,
                     type:value
                   })
                }}/>
            </div>
          </div>
      </Card>
    </div>
    )
  }
  return (
    <div style={prefixedStyles.body}>
      <Card style={prefixedStyles.card}>
        <div style={prefixedStyles.avatar}>
          <Avatar icon={<LockIcon />} size={60} />
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={prefixedStyles.form}>
            <div style={prefixedStyles.input}>
              <Field
                name="password"
                component={TextInput}
                type="password"
                floatingLabelText="Password"
                disabled={submitting}
              />
            </div>
          </div>
          <CardActions>
            <RaisedButton
              type="submit"
              primary
              label="Log In"
              disabled={submitting}
              icon={submitting && <CircularProgress size={20} thickness={2}/>}
              fullWidth
            />
          </CardActions>
        </form>
      </Card>
    </div>
  );
  }
  
}

Login.propTypes = {
  ...propTypes,
  theme: PropTypes.object.isRequired,
  csrfToken: PropTypes.string,
}

Login.defaultProps = {
  theme: defaultTheme,
}

const mapStateToProps = (state) => ({
  csrfToken: state.auth.csrfToken, 
});

const onSubmit = (values, dispatch, props) => {
  //dispatch(login(values, props.form, props.csrfToken))
  dispatch(push(HOME_ROUTE));
}; // when dispatching a LOGIN action it triggers a fetch saga


const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: "login",
    onSubmit, 
  })
);

export default enhance(Login);

