import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
export default class CustomerTypeSelector extends Component {
  render() {
    const { value, onChange } = this.props
    return (
      <div>
        <span>The current value is {value}.</span>
        <RaisedButton
              label="Producer"
               onClick={() => onChange('Producer')}
              fullWidth
            />
        <RaisedButton
              label="Customer"
               onClick={() => onChange('Customer')}
              fullWidth
            />
      </div>
    )
  }
}
