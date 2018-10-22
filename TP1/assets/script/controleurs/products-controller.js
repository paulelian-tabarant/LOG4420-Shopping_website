// Page starts loading...
productsList.load();

// Page is now loaded, do things on the DOM
$(function () {
    $.map(productsList.content, function (product, i) {
        let $productHtml = $(`<a id=${product.id}></a>`);
        let $productSection = $("<section class='product default-border'></section>");
        let priceStr = String(product.price).replace('.', ','); 
        $productSection.append(`<h2>${product.name}</h2>`)
            .append(`<img alt=${product.name} src=${`./assets/img/${product.image}`}></img>`)
            .append(`<p>${priceStr} $</p>`);
        $productHtml.append($productSection);
        $('#products-list').append($productHtml);
    });
});