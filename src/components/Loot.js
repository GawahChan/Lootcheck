import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBitcoin } from '../actions/bitcoin';
import { bindActionCreators } from 'redux';

export class Loot extends Component {

    componentDidMount() {
        this.props.fetchBitcoin();
    }

    computeBitcoin() {
        const { bitcoin } = this.props

        if (Object.keys(bitcoin).length === 0) return '';

        return this.props.balance / parseInt(bitcoin.bpi.USD.rate.replace(',',''), 10);
    }

    render() {
        return(
            <h3>Bitcoin balance: {this.computeBitcoin()}</h3>
        );
    }
}

function mapStateToProps(state) {
    return {
        balance: state.balance,
        bitcoin: state.bitcoin
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchBitcoin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loot);