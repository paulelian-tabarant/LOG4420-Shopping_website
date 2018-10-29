"use strict";

function displayCartContent() {
    // DOM selectors
    let $arrayContainer = $("main > .array-container");
    let $emptyCartParagraph = $("#no-item-in-cart");
    let $cartTableBody = $("tbody");
    let $totalAmountSpan = $("#total-amount");

    // DOM manipulation
    let cartProducts = panier.getContent();

    // no item in cart
    if(panier.count()==0) {
        $emptyCartParagraph.show();
        $arrayContainer.hide();
    }
    else {
        $emptyCartParagraph.hide();
        $arrayContainer.show();
        let body = []; 
        $.each(cartProducts, function (i, item) {
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
        $.each($(".remove-item-button"), (i, button) => {
            $(button).click(() => {
                if(confirm("Voulez-vous supprimer ce produit du panier ?")) {
                    panier.remove(i);
                    displayCartContent();
                }
            });
        });
        $.each($(".remove-quantity-button"), (i, button) => {
            if(cartProducts[i].number === 1)
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
    }
}

// When DOM is loaded
$(function() {
    $("#remove-all-items-button").click(() => {
        if(confirm("Voulez-vous vraiment vider le panier ?")) {
            panier.clear();
            displayCartContent();
        }
    });
    displayCartContent();
});