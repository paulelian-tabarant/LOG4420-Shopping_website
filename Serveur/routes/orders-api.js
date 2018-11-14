const express = require("express");
const router = express.Router();
const db = require("../lib/db");

/*
Orders API
All routes used to interact with our orders database
*/
router.get("/orders", (req, res) => {
    let onOrdersRetrieval = (orders) => {
        if(orders) {
            res.status(200);
            res.json(orders);
        }
    }

    db.getAllOrders(onOrdersRetrieval);
});

router.get("/orders/:id", (req, res) => {
    let onOrderRetrieval = (order) => {
        if(order) {
            res.status(200);
            res.json(order[0]);
        }
        else {
            res.status(404);
            res.send("Commande non trouvée dans la base de données.")
        }
    }

    db.getOrderById(req.params.id, onOrderRetrieval);
});

router.post("/orders", (req, res) => {
    let onCreated = (created) => {
        if(created) {
            res.status(201);
            res.send("Commande ajoutée à la base de données.");
        }
        else {
            res.status(400);
            res.send("Un ou plusieurs éléments de la commande sont invalides.");
        }
    }
    let id = req.body.id,
    firstName = req.body.firstName,
    lastName = req.body.lastName,
    email = req.body.email,
    phone = req.body.phone,
    products = req.body.products;
    
    db.createOrder(id, firstName, lastName, email, phone, products, onCreated);
});

router.delete("/orders/:id", (req, res) => {
    let onRemoved = (removed) => {
        if (removed) {
            res.status(204);
            res.send("La commande a bien été supprimée.");
        }
        else {
            res.status(404);
            res.send("La commande spécifiée n'a pas été trouvée.");
        }
    };

    db.removeOrderById(req.params.id, onRemoved);
});

router.delete("/orders/", (req, res) => {
    let onRemoved = () => {
        res.status(204);
        res.send("Les commandes ont bien été supprimées.");
    }

    db.removeAllOrders(onRemoved);
});

module.exports = router;