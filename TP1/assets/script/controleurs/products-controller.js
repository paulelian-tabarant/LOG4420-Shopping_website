function displayProductsBy(order) {
    let $productsDiv = $("#products-list").empty();
    $.map(productsList.getSortedBy(order), function (product, i) {
        let $productHtml = $(`<a id=${product.id}></a>`);
        let $productSection = $("<section class='product default-border'></section>");
        let priceStr = String(product.price).replace('.', ','); 
        $productSection.append(`<h2>${product.name}</h2>`)
            .append(`<img alt=${product.name} src=${`./assets/img/${product.image}`}></img>`)
            .append(`<p>${priceStr} $</p>`);
        $productHtml.append($productSection);
        $productsDiv.append($productHtml);
    });
}

function setAsSelected($btnGroup, index) {
    let $lastSelectedBtn = $btnGroup.children(".selected");
    let $newSelectedBtn = $($btnGroup.children()[index]);
    $lastSelectedBtn.toggleClass("selected");
    $newSelectedBtn.toggleClass("selected");
}

// Page starts loading...
productsList.load();

// Page is now loaded, do things on the DOM
$(function () {
    // DOM objects
    let sortingButtons = $("#product-criteria > button");

    // Rendering
    $.each(sortingButtons,
        (i, button) => {
            $(button).click( () => { 
                displayProductsBy(i) 
                setAsSelected($("#product-criteria"), i);
            } );
        }
    ); 
    displayProductsBy(productsList.PRICE_LH);
});