import React from 'react'
import { 
  connect
} from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {getAlltoken,getOwnerTokens} from '../../../redux/actions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TokenStatusButton from '../../components/TokenStatusButton'
import BarChart from '../../components/BarChart'
import Highlighter from 'react-highlight-words'
import Waiting from '../Waiting/Waiting'
import './Consumer.css'



export class Consumer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allToken:true,
            textFilter:''
        }
    }
    componentDidMount(){
        this.props.getAlltoken()
        this.props.getOwnerTokens(this.props.owner.address)
    }
    renderTokens(){
        let data = this.props.tokens.ownerTokens.tokens;
        if(this.state.allToken){
            data = this.props.tokens.all.tokens;
        }
        if(!data){
            return null;
        }
        data = data.filter((value)=>value.certifID.includes(this.state.textFilter) || value.owner.includes(this.state.textFilter))
        return (
            data.map((token,key)=>{
                return (
                    <TableRow key={key}>
                        <TableRowColumn>
                            <Highlighter
                                        highlightClassName='hilight_text'
                                        searchWords={[this.state.textFilter]}
                                        textToHighlight={token.certifID}
                                        />
                        </TableRowColumn>
                        <TableRowColumn>
                            <Highlighter
                                        highlightClassName='hilight_text'
                                        searchWords={[this.state.textFilter]}
                                        textToHighlight={token.owner}
                                        />
                        </TableRowColumn>
                        <TableRowColumn>{token.issuedDate ? token.issuedDate : '11/12/2017'}</TableRowColumn>
                        <TableRowColumn><BarChart Wood="40%" Grass="30%" Corn="30%" /></TableRowColumn>
                        <TableRowColumn><TokenStatusButton claimed={token.isClaimed}/></TableRowColumn>
                    </TableRow>
                )     
            })
        )
    }
    render(){
        if(!this.props.tokens.all.tokens){
            return (
                <Waiting />
            )
        }
        return (
            <div style={{height:'100%', backgroundColor: "#f4f4f4", padding:20}}>
                <div className='key_holder'>
                    <div>
                        <strong className='key_label'>ETHEREUM ADDRESS: </strong>SQDSQDSQDQSDQDQSDQSDQSD
                    </div>
                    <a href="#" className='change_key' onClick={(e)=>{e.preventDefault()}}>CHANGER</a>
                </div>
                <Toolbar className='page_toolbar'>
                    <ToolbarGroup firstChild={true} className='page_toolbar_group'>
                        <RaisedButton label="ALL TOKENS" className="filter_button" backgroundColor={this.state.allToken ? '#FEC61A':'#FFDE76'} onClick={()=>{this.setState({allToken:true})}}/>
                        <RaisedButton label="MY TOKENS" className="filter_button" backgroundColor={this.state.allToken ? '#FFDE76':'#FEC61A'} onClick={()=>{this.setState({allToken:false})}}/>
                    </ToolbarGroup>
                </Toolbar>
                <div className='table_holder'>
                    <div className='table_toolbar'>
                        <TextField hintText="Search" className='search_filed' underlineShow={false} onChange={(e,text)=>{
                                this.setState({
                                    textFilter:text
                                })
                            }}/>
                        <RadioButtonGroup name="shipSpeed" defaultSelected="corn" style={{ display: 'flex' }} className='radio_group'>
                            <RadioButton
                                value="corn"
                                label="Corn"
                                labelPosition="left"
                                className='radio_button'
                            />
                            <RadioButton
                                value="wood"
                                label="Wood"
                                labelPosition="left"
                                className='radio_button'
                            />
                            <RadioButton
                                value="grass"
                                label="Grass"
                                labelPosition="left"
                                className='radio_button'
                            />
                        </RadioButtonGroup>
                    </div>

                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn className='table_header'>Certif ID</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>OWNER</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>Issued Date</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>TYPE</TableHeaderColumn>
                                <TableHeaderColumn className='table_header'>STATUS</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.renderTokens()
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
  tokens: state.tokens,
  owner: state.owner
})
const actions = {
  getOwnerTokens,
  getAlltoken
};
export default connect(
  mapStateToProps,
  actions
)(Consumer);