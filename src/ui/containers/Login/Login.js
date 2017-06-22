import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  push,
} from 'react-router-redux';

import {
  setOwner
} from '../../../redux/actions';
import {
  HOME_ROUTE,
  OWNER_TYPES,
  CONSUMER
} from '../../../common';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';

import { 
  Card,
} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';

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
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(){
    let type = this.state.type;
    let blockChain = this.state.blockChain;
    if(blockChain && blockChain.length > 0){
      this.props.setOwner(blockChain,type);
      if(type === OWNER_TYPES.PRODUCER){
        this.props.push(HOME_ROUTE)
      }else{
        this.props.push(CONSUMER)
      }
    }
  }
  render(){
    const {
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
        <div style={prefixedStyles.form}>
            <div style={prefixedStyles.input}>
              <TextInput
                name="blockChainKey"
                type="text"
                floatingLabelText="BLOCKCHAIN KEY NUMBER"
                onChange={(e,text)=>{
                  this.setState({
                    blockChain:text
                  })
                }}
              />
            </div>
          </div>
            <RaisedButton
              backgroundColor="#FEC61A"
              label="Validate"
               onClick={this.handleSubmit}
              fullWidth
            />
      </Card>
    </div>
  );
  } 
}

const mapStateToProps = (state) => ({
  
})
const actions = {
  setOwner,
  push
}

export default connect(mapStateToProps,actions)(Login);

