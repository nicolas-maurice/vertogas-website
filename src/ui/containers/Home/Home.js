import React from 'react'
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper'
import { Card, CardHeader, CardText } from 'material-ui/Card';
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
import BiomassRow from '../../components/BiomassRow';
import TokenRow from '../../components/TokenRow';
import { getPowerPlants, selectPowerPlant, addToken, closeAddPowerPlantModal, addPowerPlant,updateTotalProduced } from '../../../redux/actions';
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
      progress: 0,
      snackbarOpen: false,
      snackbarOpenMessage: ''
    }
    this.renderCertificates = this.renderCertificates.bind(this);
    this._addPowerPlant = this._addPowerPlant.bind(this);
    this.addNewToken = this.addNewToken.bind(this);
  }
  setProgressTimer() {
    this.progressTimer = setInterval(() => {
      if (this.state.progress < 100) {
        this.setState({
          progress: this.state.progress + 1
        })
        this.props.updateTotalProduced(this.props.totalProduced + 0.1)
      } else {
        if (this.progressTimer) {
          clearInterval(this.progressTimer);
          this.progressTimer = null;
          this.setState({ snackbarOpen: true, snackbarOpenMessage: 'You can produce your certificate' })
        }
      }

    }, 3000)
  }
  componentDidMount() {
    this
      .props
      .getPowerPlants(this.props.owner.address);
    this.setProgressTimer();

  }
  renderPowerPlantDetails() {
    let { selectedPowerPlant } = this.props;
    return (
      <div className='table_holder' style={{ marginBottom: 20 }}>
        <h4>{selectedPowerPlant.name} Composition details :</h4>
        <div>
          <div>
            <div className="clearfix">
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}>Gaz sources</div>
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}>Split</div>
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}>m<sup>3</sup> produced</div>
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}>Issued certificates</div>
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}>Rest</div>
              <div className='table_header' style={{ float: 'left', width: 100 / 6 + '%' }}></div>
            </div>
          </div>
          <div>
            {
              selectedPowerPlant.mix.map((compo, key) => {
                return (
                  <BiomassRow compo={compo} key={key} addNewToken={this.addNewToken} />
                )
              })
            }
            <div style={{ marginBottom: 30 }} className="clearfix">
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>TOTAL</div>
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>100%</div>
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{Number(this.props.totalProduced).toFixed(2)}</div>
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{this.props.totalIssuedCertificates}</div>
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>1</div>
              <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderCertificates() {
    if (!this.props.selectedPowerPlant.tokens) {
      return <Waiting />
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
                return(
                  <TokenRow key={key} token={token}/>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
  makeFakeId() {
    var text = "";
    var possible = "0123456789abcdef";

    for (var i = 0; i < 64; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return '0x' + text;
  }

  _addPowerPlant(powerPlant) {
    let pp = {
      "id": 'PP' + powerPlant.name,
      "metaData": "0xba5eba1100000000babebabe0000000000000000000000000000000000000000",
      "mix": powerPlant.mix.map((el) => {
        return {
          "biomass": {
            "id": el.id,
            "name": el.name
          },
          "ratio": el.ratio
        }
      }),
      "name": powerPlant.name,
      "owner": this.props.owner.address,
      "tokens": []
    }
    this.props.addPowerPlant(pp);
  }
  addNewToken(){
      this.props.addToken(this.props.selectedPowerPlant, {
                  "certifID": this.makeFakeId(),
                  "claimer": null,
                  "id": this.makeFakeId(),
                  "isClaimed": false,
                  "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000",
                  "owner": this.props.owner.address,
                  "createDate": new Date().getTime()
      })
  }
  render() {
    const { powerPlants, selectedPowerPlant, selectPowerPlant, addPowerPlantModalOpened,totalProduced } = this.props;
    if (!selectedPowerPlant) {
      return <Waiting />
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
          totalProduced={totalProduced}
          onChangeSelectedPowerPlant={(selectedP) => {
            selectPowerPlant(selectedP);
          }}
          onProduce={(powerPlant) => {
            this.setState({ progress: 0, snackbarOpen: false, snackbarOpenMessage: '' });
            this.setProgressTimer();
            this
              .props
              .addToken(powerPlant, {
                "certifID": this.makeFakeId(),
                "claimer": null,
                "id": this.makeFakeId(),
                "isClaimed": false,
                "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000",
                "owner": this.props.owner.address,
                "createDate": new Date().getTime()
              })
          }}
          selectedPowerPlant={selectedPowerPlant} />
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
            autoHideDuration={3000} />
        </div>
        <AddPowerPlantModal addPowerPlantModalOpened={addPowerPlantModalOpened}
          addPowerPlant={this._addPowerPlant}
          closeModal={this.props.closeAddPowerPlantModal} />

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
  addPowerPlantModalOpened: state.ui.addPowerPlantModalOpened,
  totalProduced:state.ui.totalProduced,
  totalIssuedCertificates:state.ui.totalIssuedCertificates
})

let actions = {
  getPowerPlants,
  selectPowerPlant,
  addToken,
  closeAddPowerPlantModal,
  addPowerPlant,
  updateTotalProduced
}

export default connect(mapStateToProps, actions)(Home);