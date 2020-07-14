const braintree = require("braintree");
require("dotenv").config();

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT,
  publicKey: process.env.BRAINTREE_PUBLIC,
  privateKey: process.env.BRAINTREE_PRIVATE,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (error, response) {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceClient = req.body.paymentMethodNonce;
  let amountClient = req.body.amount;

  let newTransanction = gateway.transaction.sale(
    {
      amount: amountClient,
      paymentMethodNonce: nonceClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    }
  );
};
