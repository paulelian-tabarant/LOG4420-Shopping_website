"use strict";

function expiryDate(value) {
    // "mm/aa" format
    let dateRegex = /^[0-1][0-9]\/[0-9]{2}$/;
    // if format is respected
    if(!dateRegex.test(value)) 
        return false;
    let dateArray = /[0-9]{2}/.exec(value);
    let mm = Number(dateArray[0]);
    if(mm < 1 || mm > 12)
        return false;
    return true;
}

function masterCard(value) {
    let cardRegex = /^([0-9]{4} ){3}[0-9]{4}( )*$/;
    return cardRegex.test(value);
}

// when page is loading...
$.validator.addMethod("mastercard", masterCard, "Veuillez fournir un numéro de carte de crédit valide.");
$.validator.addMethod("expirydate", expiryDate, "La date d'expiration de votre carte de crédit est invalide.");

// stuff to do on the DOM
$(function() {
    let $orderForm = $("#order-form");

    // fields verification
    $orderForm.validate({
        rules: {
            firstname: {
                required: true,
                minlength: 2
            },
            lastname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneUS: true
            },
            cardnumber: {
                required: true,
                mastercard: true
            },
            expirydate: {
                required: true,
                expirydate: true
            }
        },
        submitHandler: function(form) {
            let name = $("#first-name").val();
            let surname = $("#last-name").val();
            form.submit();
            panier.clear();
            orders.add(name, surname);
        }
    });
});