"use strict";

const panier = {
	products: [],
	init: function() {
		if(typeof localStorage!='undefined') {
			let data_json = localStorage.getItem('products');
			let data = JSON.parse(data_json);
			this.products = data;
		}
	},
	save: function() {
		let data = JSON.stringify(this.products);
		localStorage.setItem('products', data);
	},
	add: function(product) {
		this.products.push(product);
		this.save();
	},
	count: function() {
		return this.products.length;
	},
	clear: function() {
		this.products = [];
		this.save();
	}
}