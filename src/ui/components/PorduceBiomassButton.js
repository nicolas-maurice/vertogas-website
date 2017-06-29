import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class PorduceBiomassButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pending:false
        }
        this.produceBioMass = this.produceBioMass.bind(this);
  }

  produceBioMass(){
    this.setState({
      pending: false
    })
  }

  render(){
    const {pending} = this.state;
    let {disabled} = this.props;
      return (
        <RaisedButton
              onClick={() => {
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
            >
             {pending ? (
               <CircularProgress 
                size={20} 
                thickness={3} 
                color="#000"
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
    
 
};

export default PorduceBiomassButton;
