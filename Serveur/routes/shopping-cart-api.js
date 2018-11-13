const express = require("express");
const router = express.Router();
const db = require("../lib/db");

/*
Shopping-cart API
All routes used to interact with the shopping-cart
*/

router.get('/shopping-cart/', (req, res) => {
  let cart = [];
  let sess = req.session;
  if(sess.products) {
	  sess.products.forEach(product => {
	  	cart.push({"productId": product.productId, "quantity": product.quantity});
	  });
  }
  else {cart}
  res.json(cart);
});

router.get('/shopping-cart/:productId', (req, res) => {
  let sess = req.session;
  if(sess.products) {
	  sess.products.forEach(product => {
	  	if(product.productId == req.params.productId) {
	  		res.json({"productId": product.productId, "quantity": product.quantity});
	  	}
	  	else {
	  		res.status(404);
      		res.send("L'identifiant specifie ne correspond a auncun element du panier.");
	  	}
	  });
  }
  else {
	res.status(404);
	res.send("L'identifiant specifie ne correspond a auncun element du panier.");
  }
});

router.post('/shopping-cart', (req, res) => {
  let sess = req.session;
  let productId = req.body.productId,
  	quantity = req.body.quantity;

  if(!isInteger(quantity) || quantity < 0 ) {
  	res.status(400);
    res.send("La quantite specifiee est invalide.");
  }

  else if(sess.products) {
	  sess.products.forEach(product => {
	  	if(product.productId == productId) {
	  		res.status(400);
      		res.send("Le produit a deja ete ajoute au panier.");
	  	}
	  });
  }

  let onAddToCart = function (product) {
  	if (product) {
      sess.products.push({"productId": product.productId, "quantity": product.quantity});
  	  res.status(201);
  	  res.send("Le produit a ete ajoute au panier.");
  	}
    else {
      // redirects to 404
      res.status(400);
      res.send("L'identifiant "+productId+" n'existe pas.");
    }
  }

  db.getProductById(productId, onAddToCart);
});

router.put('/shopping-cart/:productId', (req, res) => {
  let sess = req.session;
  let quantity = req.body.quantity;
  let findProduct = false;

  if(!isInteger(quantity) || quantity < 0 ) {
  	res.status(400);
    res.send("La quantite specifiee est invalide.");
  }

  else if(sess.products) {
	  sess.products.forEach(product => {
	  	if(product.productId == req.params.productId) {
	  		findProduct = true;
	  		product.quantity = quantity;
	  		res.status(204);
	  		res.send("La quantite a ete mise a jour.")
	  	}
	  });
  }

  if(!findProduct) {
  	res.status(404);
    res.send("Le produit specifie n'existe pas dans le panier.");
  }
});

router.delete('/shopping-cart/:productId', (req, res) => {
  let sess = req.session;
  let findProduct = false;

  if(sess.products) {
	  for (var i = 0; i < sess.products.length - 1; i++) {
	  	if(sess.products[i].productId == req.params.productId) {
	  		findProduct = true;
	  		sess.products.splice(i,1);
	  		res.status(204);
	  		res.send("Le produit specifie a bien ete supprime du panier.");
	  	}
	  }
  }

  if(!findProduct) {
  	res.status(404);
    res.send("Le produit specifie n'existe pas dans le panier.");
  }
});

router.delete('/shopping-cart', (req, res) => {
  let sess = req.session;
  sess.products = null;
  res.status(204);
  res.send("Tous les elements du panier ont ete supprimes.");
});

module.exports = router;