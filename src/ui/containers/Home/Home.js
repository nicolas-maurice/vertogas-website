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
import {getPowerPlants,getPowerPlantsTokens} from '../../../redux/actions';
import {
  white
} from 'material-ui/styles/colors';

import logo from './logo.svg';

const producerBody = {
  float:'left', 
  width:'70%', 
  height:'100%', 
  backgroundColor:"#F4F4F4"
}

export class Home extends React.Component {
  componentDidMount(){
    this.props.getPowerPlants('0x13377b14b615fff59c8e66288c32365d38181cdb');
    console.log('component did mount')
  }
  render(){
    const {powerPlants,selectedPowerPlant} = this.props;
    console.log(powerPlants)
    console.log(selectedPowerPlant)
    if(!selectedPowerPlant){
      return <div> loading</div>
    }
     return (
          <Paper zDepth={3} style={{height:"100%",backgroundColor:"transparent"}}>
            <ProducerSideBar powerPlants={powerPlants}/>
            <div style={producerBody}>
              <div style={{margin:20}}>
                <div className='key_holder'>
                    <div>
                        <strong className='key_label'>KEY: </strong>SQDSQDSQDQSDQDQSDQSDQSD
                    </div>
                    <a href="#" className='change_key' onClick={(e)=>{e.preventDefault()}}>CHANGER</a>
                </div>
                <div className='table_holder' style={{marginBottom:20}}>
                    <h4>{selectedPowerPlant.name} Composition details :</h4>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn className='table_header'>Gaz sources</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Split</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Production Rolling Year</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>ssued certificates</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Rest</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                           {
                             selectedPowerPlant.mix.map((compo,key)=>{
                               return (
                                  <TableRow key = {key}>
                                    <TableRowColumn>{compo.biomass.name}</TableRowColumn>
                                    <TableRowColumn>{compo.ratio}%</TableRowColumn>
                                    <TableRowColumn>{compo.ratio}</TableRowColumn>
                                    <TableRowColumn>{compo.ratio}</TableRowColumn>
                                    <TableRowColumn>{compo.ratio}</TableRowColumn>
                                  </TableRow>
                               )
                             })
                           }
                            <TableRow>
                                <TableRowColumn>TOTAL</TableRowColumn>
                                <TableRowColumn>-</TableRowColumn>
                                <TableRowColumn>100</TableRowColumn>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className='table_holder'>
                    <h4>TOKENS</h4>            
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
  getPowerPlants
}

export default connect(
  mapStateToProps,
  actions
)(Home);