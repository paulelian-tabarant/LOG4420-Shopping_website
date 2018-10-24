"use strict";

const panier = {
	products: [],
	init: function() {
		if(typeof localStorage!='undefined') {
			// let data_json = localStorage.getItem('products');
			// let data = JSON.parse(data_json);
			// this.products = data;
		}
	},
	save: function() {
		let data = JSON.stringify(this.products);
		localStorage.setItem('products', data);
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
		//this.save();
	},
	count: function() {
		return this.products.length;
	},
	clear: function() {
		this.products = [];
		this.save();
	},
}