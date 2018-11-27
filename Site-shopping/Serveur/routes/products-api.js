const express = require("express");
const router = express.Router();
const db = require("../lib/db");

/*
Products API
All routes used to interact with our products databse
*/

router.get('/products/', (req, res, next) => {
  // Called when products have been retrieved from the DB
  let onProductsRetrieval = function (products, sortFunction) {
    let productsJSON = [];
    if (products) {
      res.json(products.sort(sortFunction));
    } else {
      res.status(400);
      res.send("Critère ou catégorie invalide.");
    }
  }

  let category = req.query.category;
  let criterion = req.query.criteria;
  db.getProducts(category, criterion, onProductsRetrieval);
});

router.get('/products/:id', (req, res, next) => {
  //called when product has been retrieved from the DB 
  let onProductRetrieval = function (product) {
    if (product)
      res.json(product[0]);
    else {
      // redirects to 404
      res.status(404);
      res.send("Produit non trouvé!");
    }
  }

  db.getProductById(req.params.id, onProductRetrieval);
});

router.post('/products/', (req, res) => {
  let id = req.body.id,
    name = req.body.name,
    price = req.body.price,
    image = req.body.image,
    category = req.body.category,
    description = req.body.description,
    features = req.body.features;

  let onCreated = function (created) {
    if (created) {
      res.status(201);
      res.send("Produit \"" + name + "\" créé dans la base de données.");
    } else {
      res.status(400);
      res.send("L'un des champs de saisie des caractéristiques du produit est invalide.");
    }
  }

  db.createProduct(id, name, price, image, category, description, features, onCreated);
});

router.delete('/products/:id', (req, res, next) => {
  let id = req.params.id;

  let onRemoved = function (removed) {
    if (removed) {
      res.status(204);
      res.send("Le produit d'itentifiant n°${id} a été correctement supprimé de la base de données.");
    } else
      next();
  }

  db.removeProductWithId(id, onRemoved);
});

router.delete('/products/', (req, res) => {
  let onRemoved = function (removed) {
    if (removed) {
      res.status(204);
      res.send("Tous les produits ont été supprimés de la base de données.");
    } 
  };

  db.removeAllProducts(onRemoved);
});

module.exports = router;
