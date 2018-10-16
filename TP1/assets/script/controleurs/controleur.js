"use strict";

panier.init();
let counter = panier.count();

$(document).ready(function() {
	if(counter==0) {
		$('.shopping-cart > .count').hide();
	}
	else {
		$('.shopping-cart > .count').text(counter);
	}
});