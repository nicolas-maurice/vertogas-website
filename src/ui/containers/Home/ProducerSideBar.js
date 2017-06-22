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

import './ProducerSideBar.css';
const data = [{name: 'Grass', value: 400}, {name: 'Wood', value: 300},
                  {name: 'Corn', value: 300}];

const styles = {
  sidebarProducer: {
    flex: '0 0 300px',
    marginLeft: 0,
    order: -1,
    background: "rgba(34, 34, 34, 0.68)",
    color: "#fff",
    borderRadius: 0,
    padding: 20,
    width: '350px',
    float: 'left',
    height: "100%"
  }
};

const COLORS = ['#FEC61A', '#CD9B00', '#9E7700'];


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';


  return (
    <g>
      <text x={cx} y={cy-10} dy={8} textAnchor="middle" fill="#fff">
        {percent*100}%
      </text>

      <text x={cx} y={cy+10} dy={8} textAnchor="middle" fill="#fff">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
     
    </g>
  );
};


const ProducerSideBar = (props) => {
  const { open, children } = props;
  return (
    <Paper style={styles.sidebarProducer} zDepth={3} className="producerSideBar">
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

      <h2 style={{
        fontSize: 14,
        color: "#FFFFFF"
      }}>POWERPLANT_1 DETAILS :</h2>

        <span className="tag Corn">Corn</span>
        <span className="tag Wood">Wood</span>
        <span className="tag Grass">Grass</span>

      <p style={{/* Lorem ipsum dolor si: */
                    fontSize: 12,
                    color: "#FFFFFF"}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit commodi repudiandae amet sed exercitationem, debitis dignissimos fugiat sint beatae omnis facere possimus incidunt explicabo perferendis, dolorem fuga voluptates accusantium at.
      </p>


      	<PieChart width={300} height={300} style={{margin:"auto"}}>
          <Pie 
            data={data}
            activeIndex={1}
            activeShape={renderActiveShape} 
            cx="50%" 
            cy="50%" 
            innerRadius={40}
            outerRadius={80} 

            startAngle={90}
            endAngle={-360}

            //isAnimationActive={false}

            fill="#8884d8">
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
       </PieChart>


      <RaisedButton
        label="PRODUCE"
        fullWidth
        backgroundColor="#FEC61A"
        /*style={{height: 60}}*/
      />


      
    </Paper>
  );
};


export default ProducerSideBar;
