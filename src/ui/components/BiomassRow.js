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
        expanded:false
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
            <div {...otherProps} style={{clear:'both'}}>
                <div style={{float:'left',width:100/6+'%'}}>
                {compo.biomass.name}
                </div>
                <div style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float:'left',width:100/6+'%'}}>{compo.ratio * 10 / 100}</div>
                <div style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float:'left',width:100/6+'%'}}>{compo.ratio}</div>
                <div style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float:'left',width:100/6+'%'}}>{compo.ratio}</div>
                <div style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float:'left',width:100/6+'%'}}>{compo.ratio}</div>
                <div style={{verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float:'left',width:100/6+'%'}}><PorduceBiomassButton onClick={()=>{
                      let self = this;
                      this.setState({
                          expanded:true
                      });
                      {/*setTimeout(()=>{
                          self.setState({expanded:false})
                      },3000)*/}
                    }}/></div>

                <div style={{width:'100%'}}>
                    <Card style={{boxShadow: 'none'}} expanded={this.state.expanded}>
                        <CardText expandable={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                    </Card>
                </div>
            </div>

    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default BiomassRow;
