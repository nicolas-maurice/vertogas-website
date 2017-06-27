import React from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';


class PieChartWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex:this.props.activeIndex
    }

    this.renderActiveShape = this.renderActiveShape.bind(this);
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
  }

  
    renderActiveShape(props){

        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,fill, payload, value } = props;

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
    }

    updateActiveIndex(event,activeIndex){
      this.setState({
        activeIndex
      })
    }

    render(){
    const {claimed, pending} = this.state;
    const {data,tagColors} = this.props;

      return (
        
      	<PieChart width={300} height={300} style={{margin:"auto"}}>
          <Pie 
            data={data}
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={this.renderActiveShape} 
            cx="50%" 
            cy="50%" 
            innerRadius={65}
            outerRadius={100} 
            startAngle={90}
            endAngle={-360}
            legendType='circle'

            onClick={(e,index)=>this.updateActiveIndex(e,index)}
            
            //isAnimationActive={false}

            fill="#8884d8">
            {
              data.map((entry, index) => <Cell key={entry.name} fill={`#${tagColors[index % tagColors.length]}`}/>)
            }
          </Pie>
       </PieChart>

      );
  }
    
 
};

export default PieChartWrapper