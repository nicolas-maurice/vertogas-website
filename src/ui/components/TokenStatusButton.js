import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ActionDone from 'material-ui/svg-icons/action/done';
const TokenStatusButton = (props) => {
  return (
   <FlatButton
      onClick={props.onClick}
      label={props.claimed ? "Claimed" : "Claim it"}
      secondary={true}
      style={{color:props.claimed? '#6EBF1D':'white',height:28}}
      backgroundColor={props.claimed? 'whiye':'#6EBF1D'}
      icon={props.claimed ? <ActionDone /> : null}
    />
  );
};

export default TokenStatusButton