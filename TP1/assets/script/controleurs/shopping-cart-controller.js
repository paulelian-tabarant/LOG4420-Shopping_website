$(function() {
    // DOM selectors
    $arrayContainer = $("main > .array-container");
    $emptyCartParagraph = $("#no-product-in-cart");

    // DOM manipulation
    if(panier.count()) {
        $emptyCartParagraph.hide();
        $arrayContainer.show();
    }
    // no product in cart
    else {
        $emptyCartParagraph.show();
        $arrayContainer.hide();
    }
})