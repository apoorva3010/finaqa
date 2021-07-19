/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initGpay(transId, amount) {
    const supportedInstruments = [
        {
            supportedMethods: ['https://tez.google.com/pay'],
            data: {
                pa: 'finaqasolutionspriva.60523199@hdfcbank',
                pn: 'FinaQA Solutions Pvt Ltd',
                tr: transId, // your custom transaction reference ID
                url: 'https://www.finaqa.com',
                mc: '7277', // your merchant category code
                tn: 'Payment for query'
            }
        }
    ];
    
    let amountFixed = window.parseFloat(amount).toFixed(2);

    let details = {
        total: {label: 'Base amount', amount: {currency: 'INR', value: amountFixed}},
        displayItems: [
            {
                label: 'Query base price',
                amount: {currency: 'INR', value: amountFixed}
            }
        ]
    };

    return new PaymentRequest(supportedInstruments, details);
}
