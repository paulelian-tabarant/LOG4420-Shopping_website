"use strict";
// should be called each time cart content is modified.
function refreshCart() {
	let counter = panier.count();
	let $cartCpt = $(".shopping-cart > .count");
	if(counter === 0) 
		$cartCpt.hide();
	else 
		$cartCpt.show().text(counter);
}

panier.init();
window.addEventListener('beforeunload', () => {
	panier.save();
});

// When DOM is loaded
$(document).ready(function() {
	refreshCart();
});