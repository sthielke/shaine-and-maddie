var Product = require('../models/product');

var apiController = {
    post: function(req, res){
         //console.log(req.body)
        var newProduct = new Product(req.body);
        //console.log(newProduct)
        newProduct.save(function(err, response){
            //console.log(response)
            res.send(response)
        })
    },

    get: function(req, res){
        if(req.params.id){
            Product.find({_id: req.params.id}, function(err, response){
                res.send(response)
            });
        }
        else{
            Product.find(function(err, response){
                res.send(response)
            })
        }
    },

    put: function(req, res){

        if(req.body.price === undefined || req.body.price === ""){
            Product.update({_id: req.params.id}, {$set: {name: req.body.name}}, function(err, response){
            });
        }
        else if(req.body.name === undefined || req.body.name === ""){
            Product.update({_id: req.params.id}, {$set: {price: req.body.price}}, function(err, response){
            });
        }
        else{
            Product.update({_id: req.params.id}, {$set: {name: req.body.name, price: req.body.price}}, function(err, response){
            });
        }{}

        Product.find(function(err, response){
            res.send(response)
        });
    },

    delete: function(req, res){
        console.log(req.params.id);
        Product.remove({_id: req.params.id}, function(err, response){
            res.send(response)
        });
    }
};

module.exports = apiController;