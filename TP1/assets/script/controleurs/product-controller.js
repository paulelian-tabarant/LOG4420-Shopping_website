// called by product service if product has not
// been found into the JSON file
function productNotFound() {
    $("main").hide();
    $("#product-not-found").show();
}
// page starts loading ...
product.load();

// page finished loading, do stuff on the DOM
$(function() {
    // DOM selectors
    $notFound = $("#product-not-found");
    $main = $("main");
    $name = $("#product-name");
    $image = $("#product-image");
    $description = $("#product-desc");
    $features = $("#product-features");
    $price = $("#product-price");

    // Getting data and loading content into the html structure
    $notFound.hide();
    $main.show();
    $name.text(product.getName());
    $image.attr("src", product.getImage());
    $description.html(product.getDesc());
    $.each(product.getFeatures(), (i, feature) => { 
        $features.append(`<li>${feature}</li>`); 
    });
    $price.text(product.getPrice());
});