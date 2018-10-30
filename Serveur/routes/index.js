const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});
router.get("/accueil", (req, res) => {
  res.render("index", { title: "Accueil", message: "Ça semble fonctionner!" });
});
router.get("/produits", (req, res) => {
  res.render("products", { title: "Produits", message: "Ça semble fonctionner!" });
});
router.get("/produits/:id", (req, res) => {
  res.render("product", { title: "Produit", message: "Ça semble fonctionner!" });
});
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", message: "Ça semble fonctionner!" });
});
router.get("/panier", (req, res) => {
  res.render("shopping-cart", { title: "Panier", message: "Ça semble fonctionner!" });
});
router.get("/commande", (req, res) => {
  res.render("order", { title: "Commande", message: "Ça semble fonctionner!" });
});
router.get("/confirmation", (req, res) => {
  res.render("confirmation", { title: "Confirmation", message: "Ça semble fonctionner!" });
});

module.exports = router;
