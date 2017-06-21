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


import background from '../../../../public/img/background.png'
import './Login.css';
const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },

  card: {
    minWidth: 300,
    background: "rgba(43,43,43,0.57)",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50)",
    color: "#fff",
    padding: "82px 130px",
    textAlign: "center"
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
        <div className="backgroundContainer">
          <img src={background} alt="" className="backgroundPicture"/>
        </div>
          
        <Card style={prefixedStyles.card}>
          <div style={prefixedStyles.avatar}>SELECT AMONG THE TWO CHOICES BELOW? </div>
          <div style={{marginBottom:20}}>YOU ARE A :</div>
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
      <div className="backgroundContainer">
        <img src={background} alt="" className="backgroundPicture"/>
      </div>
      <Card style={prefixedStyles.card}>
        <div>
          ENTER YOUR BLOCKCHAIN KEY BELOW :
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={prefixedStyles.form}>
            <div style={prefixedStyles.input}>
              <Field
                name="password"
                component={TextInput}
                type="password"
                floatingLabelText="BLOCKCHAIN KEY NUMBER"
                disabled={submitting}
              />
            </div>
          </div>
          <CardActions>
            <RaisedButton
              backgroundColor="#FEC61A"
              label="Validate"
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

