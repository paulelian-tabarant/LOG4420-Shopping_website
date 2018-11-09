"use strict";
const dbAddr = "mongodb://admin:onlineshop4420@ds155293.mlab.com:55293/online-shop-data"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const orders = new Schema({
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


const products = new Schema({
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


function productValidator(id, name, price, image, category, description, features) {
  try {
    let idBool = validator.isInt(String(id)),
      nameBool = (typeof (name) === "string") && name.length > 0,
      priceBool = validator.isDecimal(String(price), {
        decimal_digits: '2'
      }),
      imageBool = validator.isAscii(image),
      catBool = validator.isAscii(category) && db.catList.includes(category),
      descBool = typeof (description) == "string" && description.length > 0;
    let featuresBool = true;
    if (!features.length) featuresBool = false;
    features.forEach(feature => {
      featuresBool = featuresBool && typeof (feature) === "string" && feature.length > 0;
    });
    let valid = idBool && nameBool && priceBool && imageBool && catBool && descBool && featuresBool;
    return valid;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const Order = mongoose.model("Order", orders);
const Product = mongoose.model("Product", products);

mongoose.Promise = global.Promise;

mongoose.connect(dbAddr, {
  useMongoClient: true
});


const db = {

  // Products database monitoring

  catList: ["cameras", "computers", "consoles", "screens"],
  criList: ["alpha-asc", "alpha-dsc", "price-asc", "price-dsc"],

  sortByPriceAsc: function(a, b) {
    return a.price - b.price;
  },

  sortByPriceDsc : function(a, b) {
    return b.price - a.price;
  },

  sortByNameAsc : function (a, b) {
    return a.name.localeCompare(b.name);
  },

  sortByNameDsc : function (a, b) {
    return b.name.localeCompare(a.name);
  },

  getProducts: function (category, criterion, onProductsRetrieval) {

    let products = [];
    let sortFunction = null;
    if (!criterion)
      // set as "price-asc" by default
      criterion = "price-asc";
    // checks if category & sorting criterion are valid
    if (!this.criList.includes(criterion) || (category && !this.catList.includes(category))) {
      onProductsRetrieval(null);
      return;
    }

    if (criterion === "alpha-asc")
      sortFunction = this.sortByNameAsc;
    else if (criterion === "alpha-dsc")
      sortFunction = this.sortByNameDsc;
    else if (criterion === "price-dsc")
      sortFunction = this.sortByPriceDsc;
    else
      sortFunction = this.sortByPriceAsc;

    let productCatReq = null;
    if (!category)
      // gets all products by default
      productCatReq = Product.find();
    else
      productCatReq = Product.find({
        category: category
      });
    productCatReq.
    exec((err, res) => {
      if (res) {
        products = res;
      }
      onProductsRetrieval(products, sortFunction);
    });
  },

  getProductById: function (id, onProductRetrieval) {
    let product = null;
    Product.
    find({
      id: id
    }).
    exec((err, res) => {
      if (!err && res.length > 0) product = res;
      onProductRetrieval(product);
    });
  },

  createProduct: function (id, name, price, image, category, description, features, onCreated) {
    if (!productValidator(id, name, price, image, category, description, features)) {
      onCreated(false);
      return;
    }

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
    remove({
        id: id
      },
      (err, res) => {
        if (res.result.n > 0) {
          onRemoved(true);
        } else
          onRemoved(false);
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
