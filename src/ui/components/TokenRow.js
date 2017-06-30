import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TokenStatusButton from '../../components/TokenStatusButton'
class TokenRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newlyAdded: props.newlyAdded
    };
  }

  render() {
    let {token} = this.props;
    return (
      <TableRow >
        <TableRowColumn>{token.certifID}</TableRowColumn>
        <TableRowColumn>{token.owner}</TableRowColumn>
        <TableRowColumn>{token.issuedDate
            ? token.issuedDate
            : '11/12/2017'}</TableRowColumn>
        <TableRowColumn><TokenStatusButton claimed={token.isClaimed}/></TableRowColumn>
      </TableRow>
    )
  }
}

export default TokenRow;
