"use strict";

function displayTable() {
    $("main").append('<div class="array-container">'+
                        '<table>'+
                            '<thead class="array-border">'+
                                '<tr>'+
                                    '<th></th>'+
                                    '<th>Nom</th>'+
                                    '<th>Prix unitaire</th>'+
                                    '<th>Quantité</th>'+
                                    '<th>Prix</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody class="array-border">'+
                                '<!-- Insert cart content here -->'+
                            '</tbody>'+
                        '</table>'+
                        '<p>Total : <span id="total-amount" class="bold"></span></p>'+
                        '<div class="flex">'+
                            '<button id="remove-all-items-button" class="bouton">Vider le panier</button>'+
                            '<a class="bouton" href="order.html">Commander</a>'+
                        '</div>'+
                    '</div>');

    let $cartTableBody = $("tbody");
    let $totalAmountSpan = $("#total-amount");
    let body = []; 
    $.each(panier.getContent(), function (i, item) {
        let $newRow = $("<tr></tr>");
        $newRow.append("<td><button class='remove-item-button'><i class='fas fa-times'></i></button></td>")
        .append(`<td><a href="product.html?id=${item.id}">${item.name}</a></td>`)
        .append(`<td>${formatPrice(item.price)}</td>`)
        .append(`<td><button class="remove-quantity-button"><i class="fas fa-minus"></i></button><span class="quantity">${item.number}</span><button class="add-quantity-button"><i class="fas fa-plus"></i></button></td>`)
        .append(`<td class="price">${formatPrice(panier.getTotalAmountOf(i))}</td>`);
        body.push($newRow);
    });
    $cartTableBody.html(body);
    $totalAmountSpan.text(formatPrice(panier.getTotalAmount()));
}

function displayCartContent() {
    // DOM selectors
    let $arrayContainer = $("main > .array-container");
    let $emptyCartParagraph = $("#no-item-in-cart");

    // DOM manipulation

    // no item in cart
    if(panier.count()===0) {
        if($arrayContainer.length!=0) {
            $arrayContainer.remove();
        }
        $("main").append('<p id="no-item-in-cart">Aucun produit dans le panier.</p>');
        $emptyCartParagraph = $("#no-item-in-cart");
    }
    else {
        if($emptyCartParagraph.length!=0) {
            $emptyCartParagraph.remove();
        }
        else if($arrayContainer.length!=0) {
            $arrayContainer.remove();
        }
        displayTable();
        $arrayContainer = $("main > .array-container");
        let $totalAmountSpan = $("#total-amount");

        $.each($(".remove-quantity-button"), (i, button) => {
            if(panier.getNbOf(i) === 1)
                $(button).prop("disabled", true);
            else {
                $(button).click(() => {
                    panier.modifyNbOf(i, -1);
                    displayCartContent();
                });
            }
        });
        $.each($(".add-quantity-button"), (i, button) => {
            $(button).click(() => {
                panier.modifyNbOf(i, +1);
                displayCartContent();
            });
        });
        $.each($(".remove-item-button"), (i, button) => {
            $(button).click(() => {
                if(confirm("Voulez-vous supprimer ce produit du panier ?")) {
                    panier.remove(i);
                    displayCartContent();
                }
            });
        });
        $("#remove-all-items-button").click(() => {
            if(confirm("Voulez-vous vraiment vider le panier ?")) {
                panier.clear();
                displayCartContent();
            }
        });
    }
}

// When DOM is loaded
$(function() {
    displayCartContent();
});