import React from 'react'
import { 
  connect
} from 'react-redux';
import { 
  Card, 
  CardTitle, 
  CardHeader, 
  CardText
} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import ProducerSideBar from './ProducerSideBar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TokenStatusButton from '../../components/TokenStatusButton'
import {getPowerPlants,getPowerPlantsTokens,selectPowerPlant} from '../../../redux/actions';
import {
  white
} from 'material-ui/styles/colors';

import logo from './logo.svg';

const producerBody = {
  float:'left', 
  width:'calc(100% - 350px)', 
  height:'100%', 
  backgroundColor:"#F4F4F4"
}

export class Home extends React.Component {
  componentDidMount(){
    this.props.getPowerPlants('0x13377b14b615fff59c8e66288c32365d38181cdb');
  }
  render(){
    const {powerPlants,selectedPowerPlant,selectPowerPlant} = this.props;
    if(!selectedPowerPlant){
      return <div> loading</div>
    }
     return (
          <Paper zDepth={3} style={{height:"100%",backgroundColor:"transparent"}}>
            <ProducerSideBar powerPlants={powerPlants}
                             onChangeSelectedPowerPlant={(selectedP)=>{
                               selectPowerPlant(selectedP)
                             }}
                             selectedPowerPlant={selectedPowerPlant}/>
            <div style={producerBody}>
              <div style={{margin:20}}>
                <div className='key_holder'>
                    <div>
                        <strong className='key_label'>KEY: </strong>SQDSQDSQDQSDQDQSDQSDQSD
                    </div>
                    <a href="#" className='change_key' onClick={(e)=>{e.preventDefault()}}>CHANGER</a>
                </div>

                <div className='table_holder'>
                    <h4>Certificates</h4>            
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn className='table_header'>Certif ID</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>OWNER</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Issued Date</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Rest</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>STATUS</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                              selectedPowerPlant.tokens.map((token,key)=>{
                                return (
                                  <TableRow key={key}>
                                    <TableRowColumn>token.certifID</TableRowColumn>
                                    <TableRowColumn>token.owner</TableRowColumn>
                                    <TableRowColumn>token.metaData</TableRowColumn>
                                    <TableRowColumn>token.claimer</TableRowColumn>
                                    <TableRowColumn><TokenStatusButton claimed={token.isClaimed}/></TableRowColumn>
                                  </TableRow>
                                )
                              })
                            }
                        </TableBody>
                    </Table>
                </div>
              </div>

            </div>
            
          
          </Paper>
        )
  }
 
};

const mapStateToProps = (state) => ({
  tokens: state.tokens.powerPlantsTokens,
  powerPlants: state.powerPlants,
  owner: state.owner,
  selectedPowerPlant: state.ui.selectedPowerPlant
})

let actions = {
  getPowerPlants,
  selectPowerPlant
}

export default connect(
  mapStateToProps,
  actions
)(Home);