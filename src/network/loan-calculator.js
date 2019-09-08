import axios from 'axios';

export default function calculateInterest(amount, months) {
    return axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${months}`)
        .then(res => {
            let recentInputs = []
            if (localStorage.getItem('recent-inputs')) {
                recentInputs = JSON.parse(localStorage.getItem('recent-inputs'))
            }
            if (checkAvalability(recentInputs, amount, parseInt(months))) {
                recentInputs.push({
                    amount: amount,
                    months: parseInt(months)
                })
            }
            localStorage.setItem('recent-inputs', JSON.stringify(recentInputs))
            return res
        })
}

function checkAvalability(data, amount, months) {
    let flag = 1
    data.map(item => {
        if (item.amount === amount && item.months === months) {
            flag = 0;
        }
    })
    if(flag) {
        return true
    }
    else {
        return false
    }
}