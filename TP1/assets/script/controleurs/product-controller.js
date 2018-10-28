// called by product service if product has not
// been found into the JSON file
// page starts loading ...
product.load();

// page finished loading, do stuff on the DOM
$(function() {
    // DOM selectors
    $main = $("main");
    $name = $("#product-name");
    $image = $("#product-image");
    $description = $("#product-desc");
    $features = $("#product-features");
    $price = $("#product-price");
    $addToCartBtn = $("#add-to-cart-form > button");
    $quantity = $("#quantite");
    $cartDialog = $("#dialog");

    // Getting data and loading content into the html structure
    if(!product.hasBeenLoaded()) {
        $main.html($("#product-not-found"));
        $("#product-not-found").show();
        return;
    }
    $name.text(product.getName());
    $image.attr("src", product.getImage());
    $description.html(product.getDesc());
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