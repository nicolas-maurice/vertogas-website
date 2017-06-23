import React from 'react';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {PieChart, Pie, Sector, Cell} from 'recharts';

import './ProducerSideBar.css';


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

  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value } = props;


  

  return (
    <g>
      <text x={cx} y={cy-10} dy={8} textAnchor="middle" fill="#fff">
        {value}%
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
  const {powerPlants,selectedPowerPlant,onChangeSelectedPowerPlant } = props;
  let data = selectedPowerPlant.mix.map((m)=>{
    return {name:m.biomass.name,value:m.ratio}
  })
  return (
    <Paper style={styles.sidebarProducer} zDepth={3} className="producerSideBar">
      <SelectField
          floatingLabelText={selectedPowerPlant.name}
          onChange={(e,newValue,selectedObject)=>{
            onChangeSelectedPowerPlant(selectedObject);
          }}
          >
          {powerPlants.powerPlants.map((powerPlant)=>{
            return (
              <MenuItem key={powerPlant.id} value={powerPlant} primaryText={powerPlant.name} />
            )
          })}
      </SelectField>

      <h2 style={{
        fontSize: 14,
        color: "#FFFFFF"
      }}>{selectedPowerPlant.name} DETAILS :</h2>
        {
          selectedPowerPlant.mix.map((m)=>{
            return <span key={m.biomass.id} className="tag Corn">{m.biomass.name}</span>
          })
        }
      <p style={{/* Lorem ipsum dolor si: */
                    fontSize: 12,
                    color: "#FFFFFF"}}>
        {selectedPowerPlant.meta_data ? selectedPowerPlant.meta_data : 'Missing desc'}
      </p>


      	<PieChart width={300} height={300} style={{margin:"auto"}}>
          <Pie 
            data={data}
            dataKey="value"
            activeIndex={data.indexOf(data.concat().sort((el1,el2)=>el1.value < el2.value)[0])}
            activeShape={renderActiveShape} 
            cx="50%" 
            cy="50%" 
            innerRadius={65}
            outerRadius={100} 
            startAngle={90}
            endAngle={-360}
            legendType='circle'
            
            //isAnimationActive={false}

            fill="#8884d8">
            {
              data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
       </PieChart>


       <div>ISSUED CERTFICIATE : 4</div>

       <div>on old : 5</div>


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
