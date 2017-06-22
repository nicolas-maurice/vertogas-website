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
    this.props.getPowerPlants(this.props.owner.address);
  }
  render(){
    const {powerPlants} = this.props;
    console.log(powerPlants)
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
                    <h4>POWERPLANT_1 Composition details :</h4>
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
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>4</TableRowColumn>
                                <TableRowColumn>Steve Brown</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>5</TableRowColumn>
                                <TableRowColumn>Christopher Nolan</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
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
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>4</TableRowColumn>
                                <TableRowColumn>Steve Brown</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>5</TableRowColumn>
                                <TableRowColumn>Christopher Nolan</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn><TokenStatusButton/></TableRowColumn>
                            </TableRow>
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