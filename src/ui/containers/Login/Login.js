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
import {Motion, spring} from 'react-motion';
import { 
  Card,
} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextInput from '../../components/TextInput';
import CustomerTypeSelector from '../../components/CustomerTypeSelector';


import background from '../../img/background.png'
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
    width: 614,
    height:377,
    background: "rgba(43,43,43,0.57)",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50)",
    color: "#fff",
    padding: "82px 130px",
    textAlign: "center",
    position:'relative',
    overflow:'hidden'
  },

  avatar: {
    margin: '1em',
    textAlign: 'center',
  },

  form: {
    padding: '1em 0 1em 0'
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
      showSelectCustomerTypeView:true,
      blockChain:"0xfa8edc618a3eb4804131db12272c9ad6c1dd7b32"
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
    return (
      <div style={prefixedStyles.body}>
        <div className="backgroundContainer">
          <img src={background} alt="" className="backgroundPicture"/>
        </div>
            <Card style={prefixedStyles.card}>
               <Motion style={{x: spring(this.state.showSelectCustomerTypeView ? 0 : 1)}}>
                 {({x})=>
                     
                    <div onClick={()=>{this.setState({showSelectCustomerTypeView:true})}} style={{position:'absolute',top:20,left:20,opacity:x,zIndex:1000,cursor:'pointer'}}>
                      <ArrowBack color='white'/>
                    </div>
                 }
                 </Motion>
              
              <Motion style={{x: spring(this.state.showSelectCustomerTypeView ? 0 : -100)}}>
                {({x}) =>
              <div style={{
                            position:'absolute',
                            top:0,
                            left:`${x}%`,
                            width:'calc(100% - 220px)',
                            bottom:0,
                            padding:'82px 110px'
                         }}>
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
              </div>
              }
        </Motion>
              <Motion style={{x: spring(this.state.showSelectCustomerTypeView ? 100 : 0)}}>
                {({x}) =>
              <div style={{
                            position:'absolute',
                              top:0,
                              left:`${x}%`,
                              width:'calc(100% - 220px)',
                              bottom:0,
                              padding:'115px 110px'
                        }}>
                <div>
                    ENTER YOUR BLOCKCHAIN KEY BELOW :
                  </div>
                  <div style={prefixedStyles.form}>
                      <div style={prefixedStyles.input}>
                        <TextInput
                          name="blockChainKey"
                          type="text"
                          hintText="BLOCKCHAIN KEY NUMBER"
                          underlineShow={false}
                          value={this.state.blockChain}
                          style={{
                            background: "#FFFFFF",
                            fontSize: 16,
                            color: "#919191",
                            padding: "0 5px"
                          }}
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
                        className="bigBTN"
                        fullWidth
                      />

              </div>
               }
        </Motion>
            </Card>
         
      </div>
    )
  } 
}

const mapStateToProps = (state) => ({
  
})
const actions = {
  setOwner,
  push
}

export default connect(mapStateToProps,actions)(Login);

