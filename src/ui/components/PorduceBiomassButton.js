import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class PorduceBiomassButton extends React.Component {
    constructor(props){
        super(props);
        this.produceBioMass = this.produceBioMass.bind(this);
  }

  produceBioMass(){
    this.setState({
      pending: false
    })
  }

  render(){
    let {disabled,pending} = this.props;
      return (
        <RaisedButton
              onClick={() => {
                if(pending){
                  return
                }
                if(this.props.onClick) {
                    this.props.onClick();
                }
                let self = this
                this.setState({
                  pending:true
                });
                setTimeout(function(){ 
                    self.produceBioMass()
                }, (Math.random() * 7000 + 3000));
              }}
              label={pending?"Producing":"Produce"}
              backgroundColor={pending?'rgba(254, 198, 26, 0.48)':'#FEC61A'}
              disabled={disabled}
              labelColor='#000'
              labelStyle={{textTransform: 'none'}}
              style={{height:28}}
              buttonStyle={{lineHeight:'28px'}}
            />
             
      );
  }
    
 
};

export default PorduceBiomassButton;
