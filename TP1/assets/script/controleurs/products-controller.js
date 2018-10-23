let curDisplayedCategory = productsList.ALL, 
    curSortingCriterion = productsList.PRICE_LH;

function displayProductsBy(order, category) {
    curSortingCriterion = order;
    curDisplayedCategory = category;
    let $productsDiv = $("#products-list").empty();
    let $productsNb = $("#products-count");

    // refreshing products list with new criteria
    productsList.sortBy(curSortingCriterion);
    let productsToDisplay = productsList.getOnly(curDisplayedCategory);
    $.map(productsToDisplay ,function (product, i) {
        let $productHtml = $(`<a id="${product.id}" href="./product.html?id=#${product.id}"></a>`);
        let $productSection = $("<section class='product default-border'></section>");
        let priceStr = String(product.price).replace('.', ','); 
        $productSection.append(`<h2>${product.name}</h2>`)
            .append(`<img alt=${product.name} src=${`./assets/img/${product.image}`}></img>`)
            .append(`<p>${priceStr} $</p>`);
        $productHtml.append($productSection);
        $productsDiv.append($productHtml);
    });
    
    // refreshing text hint for the number of products found
    $productsNb.text(`${productsToDisplay.length} produits`);
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
    let $sortingButtons = $("#product-criteria > button");
    let $categoryButtons = $("#product-categories > button");

    // Rendering
    $.each($categoryButtons,
        (i, button) => {
            $(button).click( () => {
                displayProductsBy(curSortingCriterion, i);
                setAsSelected($("#product-categories"), i);
            });
        }
    );
    $.each($sortingButtons,
        (i, button) => {
            $(button).click( () => { 
                displayProductsBy(i, curDisplayedCategory); 
                setAsSelected($("#product-criteria"), i);
            } );
        }
    ); 
    displayProductsBy(productsList.PRICE_LH);
});