import React, { 
  PropTypes, 
} from 'react';
import Paper from 'material-ui/Paper';
import { 
  connect, 
} from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {PieChart, Pie, Sector, Cell} from 'recharts';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const styles = {
  sidebarProducer: {
    flex: '0 0 300px',
    marginLeft: 0,
    order: -1,
    background: "rgba(34, 34, 34, 0.68)",
    color: "#fff",
    borderRadius: 0,
    padding: 20,
    width: '30%',
    float: 'left',
    height: "100%"
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProducerSideBar = (props) => {
  const { open, children } = props;
  return (
    <Paper style={styles.sidebarProducer} zDepth={3}>
      <SelectField
          floatingLabelText="Frequency"
          //onChange={this.handleChange}
      >
        <MenuItem value={1} primaryText="Never" />
        <MenuItem value={2} primaryText="Every Night" />
        <MenuItem value={3} primaryText="Weeknights" />
        <MenuItem value={4} primaryText="Weekends" />
        <MenuItem value={5} primaryText="Weekly" />
      </SelectField>

      <h2>POWERPLANT_1 DETAILS :</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit commodi repudiandae amet sed exercitationem, debitis dignissimos fugiat sint beatae omnis facere possimus incidunt explicabo perferendis, dolorem fuga voluptates accusantium at.
      </p>

      	<PieChart width={300} height={300}>
          <Pie 
            data={data} 
            cx={300} 
            cy={200} 
            innerRadius={60}
            outerRadius={80} 
            fill="#8884d8">
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
       </PieChart>


      <RaisedButton
        label="PRODUCE"
        /*style={{height: 60}}*/
      />


      
    </Paper>
  );
};


export default ProducerSideBar;
