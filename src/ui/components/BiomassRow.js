import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import {
    TableRow,
    TableRowColumn,
    TableBody
} from 'material-ui/Table';
import PorduceBiomassButton from './PorduceBiomassButton'
class BiomassRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            amount: 0,
            issued: 0
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

    render() {
        let { compo, ...otherProps } = this.props;
        return (
            <div {...otherProps} style={{ clear: 'both' }}>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em',float: 'left', width: 100 / 6 + '%' }}>
                    {compo.biomass.name}
                </div>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{compo.ratio}</div>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{Math.abs(this.state.amount.toFixed(1))}</div>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{compo.ratio}</div>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>{this.state.issued}</div>
                <div style={{ verticalAlign: 'top', height: 'auto', paddingTop: '1.4em', float: 'left', width: 100 / 6 + '%' }}>
                    <PorduceBiomassButton disabled={this.state.amount.toFixed(1) < 1}
                        onClick={() => {
                            let self = this;
                            this.setState({
                                expanded: true,
                                amount: this.state.amount - 1
                            });
                            setTimeout(() => {
                                self.setState({ expanded: false, issued: this.state.issued + 1 })
                            }, 3000)
                        }}
                    />
                </div>

                <div style={{ width: '100%' }}>
                    <Card style={{ boxShadow: 'none' }} expanded={this.state.expanded}>
                        <CardText expandable={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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

export default BiomassRow;
