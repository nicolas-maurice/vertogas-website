import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import {
    TableRow,
    TableRowColumn,
    TableBody
} from 'material-ui/Table';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import PorduceBiomassButton from './PorduceBiomassButton';
import {updateTotalProduced,updateTotalIssuedCertificates } from '../../redux/actions';
class BiomassRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            amount: 0,
            issued: 0,
            completed: 0,
        };
    }
    renderDetailsRow() {
        let { compo, ...otherProps } = this.props;
        if (this.state.expanded) {
            return (
                <TableRow {...otherProps}>
                    <TableRowColumn>

                    </TableRowColumn>
                </TableRow>
            )
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.progress(5), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        if (completed > 100) {
            this.setState({ expanded: false, issued: this.state.issued + 1,completed:0 });
            this.props.updateTotalIssuedCertificates(this.props.totalIssuedCertificates + 1)
            clearTimeout(self.timer);
            this.props.addNewToken();
        } else {
            this.setState({ completed });
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }

    render() {
        let { compo } = this.props;
        return (
            <div className="clearfix">
                <div className="clearfix">
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>
                        {compo.biomass.name}
                    </div>
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{compo.ratio}</div>                    
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{Number(this.props.totalProduced * compo.ratio / 100).toFixed(2)}</div>
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{this.state.issued}</div>
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{Number(compo.ratio/100).toFixed(2)}</div>
                    <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>
                        <PorduceBiomassButton 
                            pending={this.state.expanded}
                            disabled={Number(this.props.totalProduced * compo.ratio / 100).toFixed(2) < 1}
                            onClick={() => {
                                let self = this;
                                this.setState({
                                    expanded: true
                                });
                                this.props.updateTotalProduced(this.props.totalProduced - 1);
                                this.timer = setTimeout(() => this.progress(5), 1000);

                            }}
                        />
                    </div>
                </div>


                <div style={{ width: '100%' }} className="clearfix">
                    <Card style={{ boxShadow: 'none' }} expanded={this.state.expanded}>
                        <CardText expandable={true} className="clearfix">
                            <div style={{float:'left'}}>Lorem ipsum dolor sit amet:</div> 
                            <div style={{float:'left', width:200 / 3 +'%', padding:7}}><LinearProgress mode="determinate" value={this.state.completed} color="#fec61a"/></div>
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.timer = setInterval(() => {
            this.setState({
                amount: this.state.amount + 0.1
            })
        }, (Math.random() * 7000 + 3000))
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}


const mapStateToProps = (state) => ({
  totalProduced:state.ui.totalProduced,
   totalIssuedCertificates:state.ui.totalIssuedCertificates
})

let actions = {
    updateTotalProduced,
    updateTotalIssuedCertificates
}

export default connect(mapStateToProps, actions)(BiomassRow);