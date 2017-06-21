import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';


const predefinedStyle = {
    BarChart : {
        width: "100%",
        height: 11
    }
}

const labels = ["Wood",
"Grass",
"Corn" ]

const backgroundColors = ["#FEC61A",
"#CD9B00",
"#9E7700" ]

export default class BarChart extends Component {

    renderTypes(types){

        for(var key in types) {
            if(types.hasOwnProperty(key)) {
                <div>types[key]</div>
            }
        }
    }
    render() {
        const { value, onChange, Wood, Grass, Corn } = this.props

        const types = [
            Wood,Grass,Corn
        ]

        return (
            <div style={{display:"relative"}}>

                {types.map((item, key) => (
                        <div style={{float:"left",width:item,backgroundColor:backgroundColors[key], position:"relative", height:11}} key={key}>
                            <div style={{position:'absolute', left:0, bottom:"-14px", color:"#bbb"}}>{labels[key]}</div>
                        </div>
                    )            
                )}

            </div>
        )
    }
}
