import React from 'react'
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ProducerSideBar from './ProducerSideBar'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import TokenStatusButton from '../../components/TokenStatusButton'
import PorduceBiomassButton from '../../components/PorduceBiomassButton'
import BiomassRow from '../../components/BiomassRow'
import {getPowerPlants, selectPowerPlant, addToken,closeAddPowerPlantModal} from '../../../redux/actions';
import AddPowerPlantModal from './AddPowerPlantModal'
import Waiting from '../Waiting/Waiting'

const producerBody = {
  float: 'left',
  width: 'calc(100% - 350px)',
  height: '100%',
  backgroundColor: "#F4F4F4"
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 80,
      snackbarOpen: false,
      snackbarOpenMessage: ''
    }
    this.renderCertificates = this.renderCertificates.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  setProgressTimer() {
    this.progressTimer = setInterval(() => {
      if (this.state.progress < 100) {
        this.setState({
          progress: this.state.progress + 1
        })
      } else {
        if (this.progressTimer) {
          clearInterval(this.progressTimer);
          this.progressTimer = null;
          this.setState({snackbarOpen: true, snackbarOpenMessage: 'You can produce your certificate'})
        }
      }

    }, 750)
  }
  componentDidMount() {
    this
      .props
      .getPowerPlants(this.props.owner.address);
    this.setProgressTimer();

  }
  renderPowerPlantDetails() {
    let {selectedPowerPlant} = this.props;
    return (
      <div className='table_holder' style={{
        marginBottom: 20
      }}>
        <h4>{selectedPowerPlant.name}
          Composition details :</h4>
        <div selectable={false}>
          <div displaySelectAll={false} adjustForCheckbox={false}>
            <div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}>Gaz sources</div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}>Split</div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}>Production Rolling Year</div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}>Issued certificates</div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}>Rest</div>
              <div
                className='table_header'
                style={{
                float: 'left',
                width: 100 / 6 + '%'
              }}></div>
            </div>
          </div>
          <div displayRowCheckbox={false}>
            {selectedPowerPlant
              .mix
              .map((compo, key) => {
                return (<BiomassRow compo={compo} key={key}/>)
              })
}
            <div
              style={{
              clear: 'both',
              marginBottom: 30
            }}>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}>TOTAL</div>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}>-</div>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}>100</div>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}>3</div>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}>1</div>
              <div
                style={{
                verticalAlign: 'top',
                height: 'auto',
                paddingTop: '1.4em',
                float: 'left',
                width: 100 / 6 + '%'
              }}></div>
            </div>
          </div>
        </div>

      </div>
    )
  }
  renderCertificates() {
    if (!this.props.selectedPowerPlant.tokens) {
      return <Waiting/>
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
            {this
              .props
              .selectedPowerPlant
              .tokens
              .map((token, key) => {
                return (
                  <TableRow key={key}>
                    <TableRowColumn>{token.certifID}</TableRowColumn>
                    <TableRowColumn>{token.owner}</TableRowColumn>
                    <TableRowColumn>{token.issuedDate
                        ? token.issuedDate
                        : '11/12/2017'}</TableRowColumn>
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
  makeFakeId()
  {
    var text = "";
    var possible = "0123456789abcdef";

    for (var i = 0; i < 64; i++) 
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return '0x' + text;
  }
  handleClose() {
    this.props.closeAddPowerPlantModal()
  }
  render() {
    const {powerPlants, selectedPowerPlant, selectPowerPlant,addPowerPlantModalOpened} = this.props;
    if (!selectedPowerPlant) {
      return <Waiting/>
    }
    return (
      <Paper
        zDepth={3}
        style={{
        height: "100%",
        backgroundColor: "transparent"
      }}>
        <ProducerSideBar
          powerPlants={powerPlants}
          progress={this.state.progress}
          onChangeSelectedPowerPlant={(selectedP) => {
          selectPowerPlant(selectedP);
        }}
          onProduce={(powerPlant) => {
          this.setState({progress: 0, snackbarOpen: false, snackbarOpenMessage: ''});
          this.setProgressTimer();
          this
            .props
            .addToken(powerPlant, {
              "certifID": this.makeFakeId(),
              "claimer": null,
              "id": 3,
              "isClaimed": false,
              "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000",
              "owner": this.props.owner.address
            })
        }}
          selectedPowerPlant={selectedPowerPlant}/>
        <div style={producerBody}>
          <div style={{
            margin: 20
          }}>
            <div className='key_holder'>
              <div>
                <strong className='key_label'>ETHEREUM ADDRESS:
                </strong>SQDSQDSQDQSDQDQSDQSDQSD
              </div>
              <a
                href="#"
                className='change_key'
                onClick={(e) => {
                e.preventDefault()
              }}>CHANGER</a>
            </div>
            {this.renderPowerPlantDetails()}
            {this.renderCertificates()
}
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarOpenMessage}
            autoHideDuration={3000}/>
        </div>
        <AddPowerPlantModal addPowerPlantModalOpened={addPowerPlantModalOpened}/>
        
      </Paper>
    )
  }

  componentWillUnmount() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
      this.progressTimer = null;
    }
  }

};

const mapStateToProps = (state) => ({
    powerPlants: state.powerPlants, 
    owner: state.owner,
    selectedPowerPlant: state.ui.selectedPowerPlant,
    addPowerPlantModalOpened:state.ui.addPowerPlantModalOpened
  })

let actions = {
  getPowerPlants,
  selectPowerPlant,
  addToken,
  closeAddPowerPlantModal
}

export default connect(mapStateToProps, actions)(Home);