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
  white
} from 'material-ui/styles/colors';

import logo from './logo.svg';

const producerBody = {
  float:'left', 
  width:'70%', 
  height:'100%', 
  backgroundColor:"#F4F4F4"
}

const Home = (props) => {
  let {
    user
  } = props;

  return (
    <Paper zDepth={3} style={{height:"100%",backgroundColor:"transparent"}}>

      <ProducerSideBar />


      <div style={producerBody}>
        <Card >
          <CardHeader
            avatar={<Avatar src={logo} backgroundColor={white} size={40}/>}
            title="Home"
            subtitle="React App"
          />
          <CardTitle 
            title={'Hey what ever'}
            subtitle="We are glad to welcome you on our Flask-React boilerplate ! :-)"/>
          <CardText>
            {"Love React + Python <3"}
          </CardText>
        </Card>
      </div>
      
     
    </Paper>
  )
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps
)(Home);