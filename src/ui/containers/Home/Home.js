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
import Snackbar from 'material-ui/Snackbar';
import TokenStatusButton from '../../components/TokenStatusButton'
import {getPowerPlants,selectPowerPlant,addToken} from '../../../redux/actions';
import Waiting from '../Waiting/Waiting'

import vertogas from '../../../web3'

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
      progress:80,
      snackbarOpen:false,
      snackbarOpenMessage:''
    }
    this.renderCertificates = this.renderCertificates.bind(this);
    this.onProduce = this.onProduce.bind(this);
    this.onProduceCb = this.onProduceCb.bind(this);
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
            this.setState({
              snackbarOpen:true,
              snackbarOpenMessage:'You can produce your certificate'
            })
          }
        }
        
    },750)
  }
  componentDidMount(){
    this.props.getPowerPlants(this.props.owner.address);
    this.setProgressTimer();
    
  }
  renderCertificates(){
    if(!this.props.selectedPowerPlant.tokens){
      return  <Waiting />
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
                            <TableRowColumn>{token.issuedDate ? token.issuedDate : '11/12/2017'}</TableRowColumn>
                            <TableRowColumn><TokenStatusButton claimed={token.isClaimed} certifID={token.certifID}/></TableRowColumn>
                          </TableRow>
                        )
                      })
                  }
              </TableBody>
          </Table>
      </div>
    )
  }
  makeFakeId()
    {
        var text = "";
        var possible = "0123456789abcdef";

        for( var i=0; i < 64; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return '0x'+text;
    }

  onProduceCb(powerPlant, {certifID, metaData,  owner, timestamp}) {
    // this.setState({
    //   progress:0,
    //   snackbarOpen:false,
    //   snackbarOpenMessage:''
    // })
    // this.setProgressTimer();
    this.props.addToken(powerPlant, {
        certifID, 
        claimer: null, 
        isClaimed: false, 
        metaData, 
        owner,
        issuedDate: timestamp,
    })
  }

  onProduce(powerPlant) {
    vertogas().newCertificate(
      powerPlant.metaData,
      powerPlant.owner,
      (token) => this.onProduceCb(powerPlant, token)
    )
  }

  render(){
    const {powerPlants,selectedPowerPlant,selectPowerPlant} = this.props;
    if(!selectedPowerPlant){
      return  <Waiting />
    }
     return (
          <Paper zDepth={3} style={{height:"100%",backgroundColor:"transparent"}}>
            <ProducerSideBar powerPlants={powerPlants}
                             progress={this.state.progress}
                             onChangeSelectedPowerPlant={(selectedP)=>{
                               selectPowerPlant(selectedP);
                             }}
                             onProduce={(powerPlant) => {
                                this.onProduce(powerPlant)
                             }}
                             selectedPowerPlant={selectedPowerPlant}/>
            <div style={producerBody}>
              <div style={{margin:20}}>
                <div className='key_holder'>
                    <div>
                        <strong className='key_label'>ETHEREUM ADDRESS: </strong>SQDSQDSQDQSDQDQSDQSDQSD
                    </div>
                    <a href="#" className='change_key' onClick={(e)=>{e.preventDefault()}}>CHANGER</a>
                </div>
                {
                  this.renderCertificates()
                }
              </div>
               <Snackbar
                      open={this.state.snackbarOpen}
                      message={this.state.snackbarOpenMessage}
                      autoHideDuration={3000}
                    />
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
  powerPlants: state.powerPlants,
  owner: state.owner,
  selectedPowerPlant: state.ui.selectedPowerPlant
})

let actions = {
  getPowerPlants,
  selectPowerPlant,
  addToken
}

export default connect(
  mapStateToProps,
  actions
)(Home);