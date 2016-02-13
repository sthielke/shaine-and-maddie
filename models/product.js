var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    price 		: {type : String},
    id          : {type : String},
    imageUrl    : {type : String},
    description : {type : String}
});

var Product = mongoose.model('products', productSchema);

module.exports = Product;