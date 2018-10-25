// According to https://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name) {
    let results = new RegExp("[\?&]" + name + "=([^]*)").exec(window.location.href);
    if(results == null)
        return null;
    else
        return results[1] || 0;
};

const product = {
    // Attributes
    id: Number($.urlParam("id").replace('#', '')),
    found: false,
    name: "",
    image: "",
    description: "",
    price: "",
    features: [],

    // Methods
    load: function() {
        this.found = false;
        $.getJSON( "data/products.json", ( products ) => {
            $.each( products, (i, product) => {
                if(product.id === this.id) {
                    this.name = product.name;
                    this.image = product.image;
                    this.description = product.description;
                    this.price = product.price;
                    this.features = product.features;
                    this.found = true;
                }
            });
            // notify controller here if found == false
            if(!this.found) {
                // must wait for the DOM to be loaded before
                $(function (){
                    productNotFound();
                });
            }
        });
    },
    getId: function() {
        return this.id;
    },
    getName: function() {
        return this.name;
    },
    getImage: function() {
        return "assets/img/" + this.image;
    },
    getDesc: function() {
        return this.description;
    },
    getPrice: function() {
        return product.price;
    },
    getFeatures: function() {
        return this.features;
    }
}