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
	remove: function(i) {
		if(i >= 0 && i < this.products.length) {
			this.products.splice(i, 1);
			this.save();
		}
	},
	getContent: function() {
		return this.products.slice();
	},
	getTotalAmountOf: function(i) {
		let product = this.products[i];
		return Math.round(product.price * product.number * 100) / 100;
	},
	getTotalAmount: function() {
		let amount = 0.0;
		$.each(this.products, (i, curProduct) => {
			amount += this.getTotalAmountOf(i); 
		});
		return Math.round(amount * 100) / 100;
	},
	getNbOf: function(i) {
		let nbOfProduct = this.products[i].number;
		return nbOfProduct;
	},
	modifyNbOf: function(i, delta) {
		this.products[i].number += delta;
		this.save();
	},
	// writes cart content into local storage
	save: function() {
		let data = JSON.stringify(this.products);
		localStorage.setItem('cart', data);
		refreshCartIcon();
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
	sortAZ: function() {
		this.products.sort((p1, p2) => {
			return p1.name.localeCompare(p2.name);
		});
	},
	add: function(product, number) {
		let index = this.find(product);
		if(index === -1)
			this.products.push( { 
				id: product.getId(), 
				name: product.getName(),
				price: product.getPrice(),
				number: number });
		else
			this.products[index].number += number;
		this.sortAZ();
		this.save();
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