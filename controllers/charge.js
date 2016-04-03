// var Product = require('../models/product');

var chargeController = {
    post: function (req,res) {
        console.log('Charge request working');
        console.log(req);
        console.log(res);


        var stripeToken = req.body.stripeToken;

        var charge = stripe.charges.create({
            amount: req.body.price, // amount in cents
            currency: "usd",
            source: stripeToken,
            description: "Example charge"
        }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                // The card has been declined
            }
            res.send("completed payment!");
        });
    }
};

module.exports = chargeController;