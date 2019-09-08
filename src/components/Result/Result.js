import React from "react";
import './Result.css'

export default function result(props) {
    return (
        <div className="result-box">
            <div>
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "140px" }} className="text">Interest</div>
                        <div style={{ fontWeight: "bold" }}>{props.result.interestRate} %</div>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "140px" }} className="text">Monthly Payment</div>
                    <div style={{ fontWeight: "bold" }}>${props.result.monthlyPayment}</div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "140px" }} className="text">Total Amount</div>
                    <div style={{ fontWeight: "bold" }}>${props.result.monthlyPayment * props.result.months}</div>
                </div>
            </div>
        </div>
    )
}