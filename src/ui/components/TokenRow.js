import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TokenStatusButton from './TokenStatusButton'
import './TokenRow.css';
class TokenRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newlyAdded: props.token.createDate && (new Date().getTime() - props.token.createDate) < 7000
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.token.id === this.props.token.id){
      return 
    }
    this.setState({
      newlyAdded: nextProps.token.createDate && (new Date().getTime() - nextProps.token.createDate) < 7000
    })
    setTimeout(()=>{
      this.setState({
        newlyAdded:false
      })
    },7000)
  }
  render() {
    let {token} = this.props;
    let newlyAddedStyle =this.state.newlyAdded ? 'element':null;
    return (
      <TableRow className={newlyAddedStyle}>
        <TableRowColumn>{token.certifID}</TableRowColumn>
        <TableRowColumn>{token.owner}</TableRowColumn>
        <TableRowColumn>{token.issuedDate
            ? token.issuedDate
            : '11/12/2017'}</TableRowColumn>
        <TableRowColumn><TokenStatusButton claimed={token.isClaimed}/></TableRowColumn>
      </TableRow>
    )
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        newlyAdded:false
      })
    },7000)
  }
}

export default TokenRow;
