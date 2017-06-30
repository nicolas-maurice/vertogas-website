import React from 'react';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import generateColor from '../../../common/utils.js';
import PieChartWrapper from './PieChartWrapper';


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



const ProducerSideBar = (props) => {
  const {powerPlants,selectedPowerPlant,onChangeSelectedPowerPlant,progress,onProduce} = props;
  let data = selectedPowerPlant.mix.map((m)=>{
    return {name:m.biomass.name,value:m.ratio}
  })
  let activeIndex = data.indexOf(data.concat().sort((el1,el2)=>el1.value < el2.value)[0])

  let tagColors = generateColor("#FEC61A","#9E7700",selectedPowerPlant.mix.length);
  return (
    <Paper style={styles.sidebarProducer} zDepth={3} className="producerSideBar">
      <SelectField
          hintText={selectedPowerPlant.name}
          underlineStyle={{display:'none'}}
          onChange={(e,newValue,selectedObject)=>{
            onChangeSelectedPowerPlant(selectedObject);
          }}

          hintStyle={{
            color: "#3C4144"
          }}

          style={{
            backgroundColor: "#fff",
            color: "#3C4144",
            paddingLeft: 10
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
          selectedPowerPlant.mix.map((m,index)=>{
            return <span key={m.biomass.id} className="tag" style={{backgroundColor:`#${tagColors[index]}`}}>{m.biomass.name}</span>
          })
        }
      <p style={{/* Lorem ipsum dolor si: */
                    fontSize: 12,
                    color: "#FFFFFF"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <PieChartWrapper data={data} tagColors={tagColors} activeIndex={activeIndex}/>

       <div className='issuedcertificatesLabel'>Total volume produces : 10m<sup>3</sup></div>
   
       <button className="progress-button" data-style="fill" data-horizontal="" onClick={()=>onProduce(selectedPowerPlant)} disabled={progress < 100 ? true:null}>
          <span className="content"> &nbsp; </span>
          <span className="progress">
            <span className="progress-inner" style={{width:`${progress}%`}}></span>
          </span>
        </button>
      
    </Paper>
  );
};


export default ProducerSideBar;
