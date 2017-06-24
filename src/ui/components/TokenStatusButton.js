import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import CircularProgress from 'material-ui/CircularProgress';

class TokenStatusButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      claimed:props.claimed,
      pending:false
    }
    this.claimCertificate = this.claimCertificate.bind(this);
  }

  claimCertificate(){
    this.setState({
      claimed: true
    })
  }

  render(){
    const {claimed, pending} = this.state;

    if(claimed){
      return (
        <FlatButton
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
              onClick={() => {
                let self = this
                this.setState({
                  pending:true
                });
                setTimeout(function(){ 
                    self.claimCertificate()
                }, 3000);
              }}
              label={pending?"Pending":"Claim it"}
              backgroundColor={pending?'rgba(110, 191, 29, 0.48)':'#6EBF1D'}
              labelColor='#FFF'
              labelStyle={{textTransform: 'none'}}
              style={{height:28}}
              buttonStyle={{lineHeight:'28px'}}
            >
             {pending ? (
               <CircularProgress 
                size={20} 
                thickness={3} 
                color="#FFF"
                style={{
                    position: "relative",
                    left: "3px",
                    top: "3px"
                }}
              />
             ): null}
              
            </RaisedButton>
      );
    }
  }
    
 
};

export default TokenStatusButton