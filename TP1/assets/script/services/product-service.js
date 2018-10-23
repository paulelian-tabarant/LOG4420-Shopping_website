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
    name: "",
    image: "",
    description: "",
    price: "",
    features: [],

    // Methods
    load: function() {
        $.getJSON( "data/products.json", ( products ) => {
            $.each( products, (i, product) => {
                if(product.id === this.id) {
                    this.name = product.name;
                    this.image = product.image;
                    this.description = product.description;
                    this.price = product.price;
                    this.features = product.features;
                    // breaks 'each' loop
                    return false;
                }
            });
        });
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
        return String(this.price).replace('.', ',');
    },
    getFeatures: function() {
        return this.features;
    }
}