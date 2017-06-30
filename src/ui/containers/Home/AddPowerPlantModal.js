import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
class AddPowerPlantModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddOtherBiomass = this.handleAddOtherBiomass.bind(this);
        this.handlePowerPlantDesChange = this.handlePowerPlantDesChange.bind(this);
        this.handlePowerPlantNameChange = this.handlePowerPlantNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            powerPlantName: '',
            powerPlantDesc: '',
            mix: [{ id: 'mix-0', name: null, ratio: 0 }]
        }
        this.biomass = [
            'Bamboo', 'Poplar', 'Miscanthus', 'Hemp', 'Sorghum', 'Swithgrass'
        ]
    }

    handleChange = (mix, event, index, value) => {
        this.setState({
            mix: this.state.mix.map((biomass) => {
                if (biomass.id === mix.id) {
                    return {
                        ...biomass,
                        name: value
                    }
                }
                return biomass;
            })
        })
    }
    submitEnabled = () => {
        return this.state.powerPlantName && this.state.powerPlantName.trim().length > 0 &&
            this.state.mix.length > 0 && this.state.mix.map((bio) => { return bio.name && bio.ratio > 0 ? 'True' : 'False' }).join().indexOf('False') === -1 &&
            this.state.mix.map((bio) => bio.ratio).reduce((a, b) => a + b, 0) === 100
    }

    handleClose() {
        this.setState({
            powerPlantName: '',
            powerPlantDesc: '',
            mix: [{ id: 'mix-0', name: null, ratio: 0 }]
        })
        this.props.closeModal();

    }

    handleSubmit() {
        this.props.addPowerPlant({
            name: this.state.powerPlantName,
            desc: this.state.powerPlantDesc,
            mix: this.state.mix
        })
        this.handleClose()
    }

    handleAddOtherBiomass() {
        this.setState({
            mix: this.state.mix.concat([{ id: 'mix' + this.state.mix.length, name: null, ratio: 0 }])
        })
    }

    handleRatioChange = (mix, event, value) => {
        this.setState({
            mix: this.state.mix.map((biomass) => {
                if (biomass.id === mix.id) {
                    return {
                        ...biomass,
                        ratio: value ? parseFloat(value) : ''
                    }
                }
                return biomass;
            })
        })
    }

    handlePowerPlantDesChange(event, value) {
        this.setState({
            powerPlantDesc: value
        })
    }
    handlePowerPlantNameChange(event, value) {
        this.setState({
            powerPlantName: value
        });
    }

    handleRemoveBiomass(biomass) {
        let mixts = this.state.mix;
        mixts.splice(mixts.findIndex((el) => el.id === biomass.id), 1);
        this.setState({
            mix: mixts.slice()
        })
    }

    render() {
        let submitEnabled = this.submitEnabled();
        const actions = [
            <FlatButton label="Cancel" primary={true}
                onTouchTap={this.handleClose} />,
            <FlatButton label="Create power plant" primary={true}
                disabled={!submitEnabled}
                onTouchTap={this.handleSubmit} />
        ];

        return (
            <Dialog title="Add power plant" actions={actions} modal={true} open={this.props.addPowerPlantModalOpened}>
                <div>
                    <TextField
                        underlineShow={false}
                        value={this.state.powerPlantName}
                        onChange={this.handlePowerPlantNameChange}
                        style={{
                            border: "1px solid #000",
                            paddingLeft: 10
                        }}
                        hintText="Name" />
                </div>
                <div>
                    <TextField
                        underlineShow={false}
                        value={this.state.powerPlantDesc}
                        onChange={this.handlePowerPlantDesChange}
                        multiLine={true}
                        rows={3}
                        rowsMax={5}

                        style={{
                            border: "1px solid #000",
                            paddingLeft: 10,
                            marginTop: 15
                        }}
                        hintText="Description"
                        hintStyle={{ top: 12 }}
                    />

                </div>
                <div>
                    {
                        this.state.mix.map((mix, key) => (
                            <div key={key} style={{marginTop: 15}} className="clearfix">
                                <SelectField
                                    hintText="Biomass name"
                                    value={mix.name}
                                    onChange={this.handleChange.bind(this, mix)}
                                    
                                    underlineStyle={{ display: 'none' }}
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#3C4144",
                                        border: "1px solid #000",
                                        paddingLeft: 10,
                                        float: 'left'
                                    }}

                                >
                                    <MenuItem value={null} primaryText="" />
                                    {
                                        this.biomass.map((el) => {
                                            let used = this.state.mix.find((m) => m.id !== mix.id && m.name === el)
                                            if (!used)
                                                return (<MenuItem value={el} primaryText={el} key={el} />)
                                        })
                                    }
                                </SelectField>
                                <TextField underlineShow={false} hintText="Ratio" type="number" max={100} value={mix.ratio} onChange={this.handleRatioChange.bind(this, mix)} style={{float: 'left',border: "1px solid #000",paddingLeft: 10, marginLeft:10, width: 60}}/>
                                <FlatButton label=" remove biomass" primary={true}
                                    onTouchTap={this.handleRemoveBiomass.bind(this, mix)}  style={{float: 'left'}}/>
                            </div>
                        ))
                    }
                    {this.state.mix.length < this.biomass.length ? (
                        <FlatButton label="Add an other biomass" primary={true}
                            onTouchTap={this.handleAddOtherBiomass} />
                    ) : null
                    }

                </div>
            </Dialog>
        )
    }
}

export default AddPowerPlantModal;
