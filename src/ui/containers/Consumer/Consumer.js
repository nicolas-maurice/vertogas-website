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

import {
  white
} from 'material-ui/styles/colors';



const Consumer = (props) => {
  let {
    user
  } = props;

  return (
    <Paper zDepth={3}>
      <Card>
        <CardHeader
         
          title="Consumer"
          subtitle="React App"
        />
        <CardTitle 
          title={'Hey what ever'}
          subtitle="We are glad to welcome you on our Flask-React boilerplate ! :-)"/>
        <CardText>
          {"Love React + Python <3"}
        </CardText>
      </Card>
    </Paper>
  )
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps
)(Consumer);