"use strict";
const dbAddr = "mongodb://admin:onlineshop4420@ds155293.mlab.com:55293/online-shop-data"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, {
  versionKey: false
});


const productSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, {
  versionKey: false
});

const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);

mongoose.Promise = global.Promise;

mongoose.connect(dbAddr, {
  useMongoClient: true
});

const db = {

  // Products database monitoring

  catList: ["cameras", "computers", "consoles", "screens"],
  criList: ["alpha-asc", "alpha-dsc", "price-asc", "price-dsc"],

  getProducts: function (category, criterion, onProductsRetrieval) {

    let products = [];
    let sortAttr = "";
    let sortPrefix = "";
    if (!criterion)
      // set as "price-asc" by default
      criterion = "price-asc";
    if(!this.criList.includes(criterion))
      return null;
    if (/^alpha/.test(criterion))
      sortAttr = "name";
    else
      sortAttr = "price";
    if (/dsc$/.test(criterion))
      // mongoDB criterion uses a '-' prefix for descending order
      sortPrefix += '-';
    
    if (category && !this.catList.includes(category))
      return null;

    let productCatReq = null;
    if (!category)
      // gets all products by default
      productCatReq = Product.find();
    else
      productCatReq = Product.find({
        category: "/"+category+"/"
      });
    productCatReq.
    sort(sortPrefix + sortAttr).
    exec((err, res) => {
      if (res) 
        products = res;
      onProductsRetrieval(products);
    });
  },

  getProductById: function (id, onProductRetrieval) {
    let product = null;
    Product.
    find({
      id: id
    }).
    exec((err, res) => {
      if (!err) product = res;
      onProductRetrieval(product);
    });
  },

  createProduct: function (id, name, price, image, category, description, features, onCreated) {
    let product = new Product({
      id: id,
      name: name,
      price: price,
      image: image,
      category: category,
      description: description,
      features: features
    });
    product.save(err => {
      if (!err) onCreated(true);
      else onCreated(false);
    });
  },

  removeProductWithId: function (id, onRemoved) {
    Product.
    deleteOne({
      id: id
    }).
    exec(err => {
      if (!err) onRemoved(true);
      else onRemoved(false);
    });
  },

  removeAllProducts: function (onRemoved) {
    Product.
    deleteMany().
    exec(err => {
      if (err) onRemoved(false);
      else onRemoved(true);
    });
  }


  // to be completed with other API middlewares requirements...
}

module.exports = db;
