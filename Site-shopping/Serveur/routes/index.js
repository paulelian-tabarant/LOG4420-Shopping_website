const express = require("express");
const request = require("request");
const session = require("express-session");
const db = require("../lib/db");
const router = express.Router();

router.get("/", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	res.render("index", { title: "Accueil", message: "Ça semble fonctionner!", itemsCount: itemsCount});
});
router.get("/accueil", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	res.render("index", { title: "Accueil", message: "Ça semble fonctionner!", itemsCount: itemsCount});
});

router.get("/produits", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	db.getProducts(null, null, function(products, sortFunction) {
		res.render("products", { title: "Produits", products: products.sort(sortFunction), itemsCount: itemsCount});
	});
});

router.get("/produits/:id", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	db.getProductById(req.params.id, function(product) {
		if (product)
	      res.render("product", { title: "Produit", product: product[0], itemsCount: itemsCount});
	    else {
	      res.status(404);
	      res.render("product", { title: "Produit", product: null, message: "Page non trouvée!", itemsCount: itemsCount});
	    }
	});
});

router.get("/contact", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	res.render("contact", { title: "Contact", message: "Ça semble fonctionner!", itemsCount: itemsCount});
});

router.get("/panier", (req, res) => {
	let itemsCount = 0;
	let itemsCart = [];
	if(req.session.products) {
		req.session.products.forEach(productCart => {
			itemsCount += productCart.quantity;
		});
	}
	else {
		res.render("shopping-cart", { title: "Panier", message: "Ça semble fonctionner!", products: itemsCart, itemsCount: itemsCount});
	}
	db.getProducts(null, null, function(products, sortFunction) {
		if(req.session.products) {
			req.session.products.forEach(productCart => {
				productComplete = productCart;
				products.sort(sortFunction).forEach(product => {
					if(product.id == productComplete.productId) {
						productComplete.name = product.name;
						productComplete.price = product.price;
						productComplete.image = product.image;
						productComplete.category = product.category;
						productComplete.description = product.description;
						productComplete.features = product.features;

						itemsCart.push(productComplete);
					}
				});
			});
			res.render("shopping-cart", { title: "Panier", message: "Ça semble fonctionner!", products: itemsCart, itemsCount: itemsCount});
		}
	});
});

router.get("/commande", (req, res) => {
	let itemsCount = 0;
	if(req.session.products) {
		req.session.products.forEach(product => {
			itemsCount += product.quantity;
		});
	}
	res.render("order", { title: "Commande", message: "Ça semble fonctionner!", itemsCount: itemsCount});
});

router.post("/confirmation", (req, res) => {
	let itemsCount = 0;
    let firstName = req.body.firstName,
    lastName = req.body.lastName;
    let fullName = firstName+" "+lastName;
    db.getLastOrderFromName(firstName, lastName, function(order) {
    	let id = order.id;
		if(req.session.products) {
			req.session.products.forEach(product => {
				itemsCount += product.quantity;
			});
		}
		res.render("confirmation", { title: "Confirmation", message: "Ça semble fonctionner!", orderId: id, fullName: fullName, itemsCount: itemsCount});
    });
});

module.exports = router;
