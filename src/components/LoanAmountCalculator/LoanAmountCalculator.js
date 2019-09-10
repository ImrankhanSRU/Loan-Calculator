import Slider from '@material-ui/core/Slider';
import React, { Component } from "react";
import './LoanAmountCalculator.css'
import calculateInterest from '../../network/loan-calculator'
import Result from '../Result/Result'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoanAmountCalculator extends Component {
    constructor() {
        super();
        this.state = {
            amount: 500,
            month: 6,
            result: {},
            loader: true
        }
    }
    option() {
        let monthOptions = []
        for (let i = 6; i <= 24; i++) {
            monthOptions.push(<option key={i}>{i}</option>)
        }
        return monthOptions
    }


    componentDidMount() {
        this.calculateInterest(this.state.amount, this.state.month)
    }

    calculateInterest = (amount, month) => {
        this.setState({
            loader: true
        })
        calculateInterest(amount, month).then(result => {
            let data = {
                interestRate: result.data.interestRate,
                monthlyPayment: result.data.monthlyPayment.amount
            }
            this.setState({
                amount: amount,
                month: month,
                result: data,
                loader: false
            })
        })
    }

    // shouldComponentUpdate() {
    //     return true
    // }

    handleAmountChange = (event, value) => {
        this.setState({
            amount: value
        })
        this.calculateInterest(value, this.state.month)

    }

    handleMonthChange = (event) => {
        this.setState({
            month: parseInt(event.target.value)
        })
        this.calculateInterest(this.state.amount, event.target.value)

    }

    formRecentInputs = () => {
        let recentInputs = JSON.parse(localStorage.getItem('recent-inputs'))
        let inputs = [];
        if (recentInputs) {
            recentInputs = recentInputs.reverse()
            recentInputs.map((item, index) => {
                inputs.push(<tr onClick={() => this.calculateInterest(item.amount, parseInt(item.months))} className="card" key={index}><td className="mar-10">{item.months}months</td><td>${item.amount}</td></tr>)
            })
        }
        return inputs
    }

    render() {
        let state = this.state
        let blur = ''
        let result = { ...state.result, months: state.month }
        if (this.state.loader) {
            blur = 'blur'
        }
        let marks = [
            {
                value: state.amount,
                label: `$${state.amount}`
            }
        ];
        if (state.amount !== 5000) {
            marks.push({ value: 5000, label: `$5000` })
        }

        return (
            <div className="container">
                <div className={blur}></div>
                {
                    this.state.loader &&
                    <CircularProgress className="loader" />
                }

                <div>
                    <div className="eleWidth">
                        <h4 className="text">Loan Amount</h4>
                        <Slider
                            value={state.amount}
                            step={500}
                            min={500}
                            max={5000}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChangeCommitted={this.handleAmountChange}
                        // getAriaValueText={this.handleChange}
                        />
                    </div>
                    <div className="flex-box">
                        <div>
                            <h4 className="text">Months</h4>
                            <select value={state.month} onChange={this.handleMonthChange} className="months-select">
                                {this.option()}
                            </select>
                        </div>

                        {
                            !state.loader &&
                            <Result result={result} />
                        }
                    </div>

                </div>
                <table>
                    <tbody className="history">
                        <tr style={{ position: "fixed", top: '5%' }}>
                            <th>Recent inputs</th>
                        </tr>
                        {this.formRecentInputs()}
                    </tbody>
                </table>
            </div>
        );
    }
}