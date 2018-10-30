"use strict";

function displayProduct() {
    $('main').append('<h1 id="product-name">'+product.getName()+'</h1>'+
                '<div class="product-details flex">'+
                    '<div class="col">'+
                        '<img id="product-image" alt="'+product.getName()+'" src="'+product.getImage()+'">'+
                    '</div>'+
                    '<div class="col">'+
                        '<h2>Description</h2>'+
                        '<p id="product-desc">'+product.getDesc()+'</p>'+
                        '<h2>Caractéristiques</h2>'+
                        '<ul id="product-features">'+
                            '<!-- Product features will be placed here, into <li></li> elements -->'+
                        '</ul>'+
                        '<hr class="separator">'+
                        '<div class="flex">'+
                            '<p>Prix: <span id="product-price"></span></p>'+
                            '<form id="add-to-cart-form">'+
                                '<label for="quantite">Quantité : </label>'+
                                '<input class="default-border" id="quantite" type="number" value="1" min="1">'+
                                '<button type="submit" class="bouton"><span class="fas fa-cart-plus"></span> Ajouter</button>'+
                            '</form>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div hidden class="dialog-box" id="dialog">'+
                    'Le produit a été ajouté au panier.'+
                '</div>');
}

// page finished loading, do stuff on the DOM
$(document).ready(function() {

    product.load();

    // Getting data and loading content into the html structure
    if(!product.hasBeenLoaded()) {
        $('main').html('<h1>Page non trouvée!</h1>');
        return;
    }
    displayProduct();

    // DOM selectors
    let $features = $("#product-features");
    let $price = $("#product-price");
    let $quantity = $("#quantite");
    let $cartDialog = $("#dialog");

    $.each(product.getFeatures(), (i, feature) => { 
        $features.append(`<li>${feature}</li>`); 
    });
    $price.text(formatPrice(product.getPrice()));

    $("#add-to-cart-form").on("submit", (e) => {
        e.preventDefault();
        let nb = Number($quantity.val());
        // if '0' quantity specified, nothing special to do
        if(nb) { 
            panier.add(product, nb);
            $cartDialog.show("fast", () => {
                setTimeout(() => {
                    $cartDialog.hide();
                }, 5000);
            });
        }
    });
});