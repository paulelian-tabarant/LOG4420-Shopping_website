"use strict";

// should be called each time cart content is modified.
function refreshCartIcon() {
	let counter = panier.count();
	let $cartCpt = $(".shopping-cart > .count");
	if(counter === 0) 
		$cartCpt.hide();
	else 
		$cartCpt.show().text(counter);
}

function formatPrice(price) {
	return String(price).replace('.', ',') + " $";
}

panier.init();

// When DOM is loaded
$(document).ready(function() {
	refreshCartIcon();
});