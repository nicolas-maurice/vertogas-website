import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {
  TableRow,
  TableRowColumn,
  TableBody
} from 'material-ui/Table';
import PorduceBiomassButton from './PorduceBiomassButton'
class BiomassRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        expanded:false,
        amount:0,
        issued:0
     };
  }
  renderDetailsRow(){
      let {compo,...otherProps} = this.props;
      if(this.state.expanded){
          return(
            <TableRow {...otherProps}>
                <TableRowColumn>
                    
                </TableRowColumn>
            </TableRow>
          )
      }
  }
  
  render() {
      let {compo,...otherProps} = this.props;
    return (
     
            <TableRow {...otherProps}>
                <TableRowColumn>
                    <Card style={{boxShadow: 'none'}} expanded={this.state.expanded}>
                        <CardText>{compo.biomass.name}</CardText>
                        <CardText expandable={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                    </Card>
                </TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em'}}>{Math.abs(this.state.amount.toFixed(1))}</TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em'}}>{compo.ratio}</TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em'}}>{this.state.issued}</TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em'}}>{compo.ratio}</TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em'}}>
                    <PorduceBiomassButton disabled={this.state.amount.toFixed(1) < 1} 
                            onClick={()=>{
                                let self = this;
                                this.setState({
                                    expanded:true,
                                    amount:this.state.amount - 1
                                });
                                setTimeout(()=>{
                                    self.setState({expanded:false,issued:this.state.issued + 1})
                                },3000)
                            }}
                    />
                </TableRowColumn>
            </TableRow>
         
    );
  }

  componentDidMount() {
   if(this.timer){
       clearInterval(this.timer);
       this.timer = null;
   }
   
   this.timer = setInterval(()=>{
       this.setState({
           amount:this.state.amount + 0.1
       })
   },(Math.random() * 7000 + 3000))
  }

  componentWillUnmount(){
      if(this.timer){
          clearInterval(this.timer);
          this.timer = null;
      }
  }
}

export default BiomassRow;
