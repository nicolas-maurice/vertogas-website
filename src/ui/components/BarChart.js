import React, { Component } from 'react'

const labels = ["Wood","Grass","Corn" ]

const backgroundColors = ["#FEC61A","#CD9B00","#9E7700" ]

export default class BarChart extends Component {

    render() {
        const {Wood, Grass, Corn } = this.props

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
