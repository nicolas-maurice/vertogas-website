import React from 'react'
import { 
  connect
} from 'react-redux';
import Paper from 'material-ui/Paper'
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
import {getPowerPlants,selectPowerPlant,getPowerPlantsTokens} from '../../../redux/actions';


const producerBody = {
  float:'left', 
  width:'calc(100% - 350px)', 
  height:'100%', 
  backgroundColor:"#F4F4F4"
}

export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      progress:80
    }
    this.renderCertificates = this.renderCertificates.bind(this);
  }
  setProgressTimer(){
  this.progressTimer =   setInterval(()=>{
        if(this.state.progress < 100){
          this.setState({
              progress: this.state.progress + 1
          })
        }else{
          if(this.progressTimer){
            clearInterval(this.progressTimer);
            this.progressTimer = null;
          }
        }
        
    },1000)
  }
  componentDidMount(){
    this.props.getPowerPlants('0x0084313bb3d4326a50f6361aa193905b3f165359');
    this.setProgressTimer();
    
  }
  renderCertificates(){
    if(!this.props.selectedPowerPlant.tokens){
      return <div>Loading</div>
    }
    return (
      <div className='table_holder'>
          <h4>Certificates</h4>            
          <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                      <TableHeaderColumn className='table_header'>Certif ID</TableHeaderColumn>
                      <TableHeaderColumn className='table_header'>OWNER</TableHeaderColumn>
                      <TableHeaderColumn className='table_header'>Issued Date</TableHeaderColumn>
                      <TableHeaderColumn className='table_header'>STATUS</TableHeaderColumn>
                  </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                  {
                      this.props.selectedPowerPlant.tokens.map((token,key)=>{
                        return (
                          <TableRow key={key}>
                            <TableRowColumn>{token.certifID}</TableRowColumn>
                            <TableRowColumn>{token.owner}</TableRowColumn>
                            <TableRowColumn>{token.issuedDate}</TableRowColumn>
                            <TableRowColumn><TokenStatusButton claimed={token.isClaimed}/></TableRowColumn>
                          </TableRow>
                        )
                      })
                  }
              </TableBody>
          </Table>
      </div>
    )
  }
  render(){
    const {powerPlants,selectedPowerPlant,selectPowerPlant,getPowerPlantsTokens,tokens} = this.props;
    if(!selectedPowerPlant){
      return <div> loading</div>
    }
     return (
          <Paper zDepth={3} style={{height:"100%",backgroundColor:"transparent"}}>
            <ProducerSideBar powerPlants={powerPlants}
                             progress = {this.state.progress}
                             onChangeSelectedPowerPlant={(selectedP)=>{
                               selectPowerPlant(selectedP);
                             }}
                             onProduce={()=>{
                               this.setState({
                                 progress:0
                               })
                               this.setProgressTimer();
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
                {
                  this.renderCertificates()
                }
              </div>

            </div>
            
          
          </Paper>
        )
  }


  componentWillUnmount(){
    if(this.progressTimer){
      clearInterval(this.progressTimer)
      this.progressTimer = null;
    }
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
  selectPowerPlant,
  getPowerPlantsTokens
}

export default connect(
  mapStateToProps,
  actions
)(Home);