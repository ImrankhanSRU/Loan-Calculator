
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import LoanAmountCalculator from '../components/LoanAmountCalculator/LoanAmountCalculator';

export default function Router() {
    return (
        <BrowserRouter>
            <Route default path="/" component={LoanAmountCalculator} />
        </BrowserRouter>
    );
}
