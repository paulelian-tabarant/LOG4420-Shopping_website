"use strict";

const panier = {
	products: [],
	// gets cart content from local storage if available
	init: function() {
		if(typeof localStorage!='undefined') {
			let dataString = localStorage.getItem('cart');
			if(dataString != null) {
				let data = JSON.parse(dataString);
				this.products = data;
			}
		}
	},
	// writes cart content into local storage
	save: function() {
		let data = JSON.stringify(this.products);
		localStorage.setItem('cart', data);
	},

	find: function(product) {
		let res = -1;
		let id = product.getId();
		$.each(this.products, (i, curProduct) => { 
			 if(curProduct.id === id) 
			 	res = i;
		});
		return res;
	},
	add: function(product, number) {
		let index = this.find(product);
		if(index === -1)
			this.products.push( { 
				id: product.getId(), 
				number: number });
		else
			this.products[index].number += number;
		this.save();
		refreshCart();
	},
	count: function() {
		let n = 0;
		$.each(this.products, (i, curProduct) => {
			n += curProduct.number;
		});
		return n;
	},
	clear: function() {
		this.products = [];
		this.save();
	},
}