import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDone from 'material-ui/svg-icons/action/done';
const TokenStatusButton = (props) => {
  let component = props.claimed ? RaisedButton : FlatButton

  if(props.claimed){
    return (
      <FlatButton
          onClick={props.onClick}
          label="Claimed"
          labelStyle={{color:'#6EBF1D', textTransform: 'none'}}
          style={{height:28}}
          icon={<ActionDone style={{fill:"#6EBF1D", marginLeft:0}}/>}
          disabled={true}
        />
      );
  }else{
    return (
      <RaisedButton
            onClick={props.onClick}
            label="Claim it"
            backgroundColor='#6EBF1D'
            labelColor='#FFF'
            labelStyle={{textTransform: 'none'}}
            style={{height:28}}
            buttonStyle={{lineHeight:'28px'}}
          />
    );
  }
 
};

export default TokenStatusButton