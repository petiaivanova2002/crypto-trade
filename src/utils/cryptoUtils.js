exports.generatePayments = function (currentPayment) {
    const paymentMethods = [
        { label: 'crypto-wallet', selected: false },
        { label: 'credit-card', selected: false },
        { label: 'debit-card', selected: false },
        { label: 'paypal', selected: false }
    ];

    const result = paymentMethods.map(x => x.label == currentPayment ? { ...x, selected: true } : x);
    return result;
};

// exports.isOwner = (crypto, user) => {
//     return crypto.owner == user._id;
// };

// exports.isBuyer = (crypto,userId) => {
//     return crypto.buyer.includes(userId);
// }