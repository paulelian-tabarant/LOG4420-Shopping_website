const productsList = {
    content: [],
    // sorting criteria
    PRICE_LH : 0,
    PRICE_HL : 1,
    NAME_AZ : 2,
    NAME_ZA : 3,
    // product categories
    CAMERAS: 0,
    CONSOLES: 1,
    SCREENS: 2,
    COMPUTERS: 3,
    ALL: 4,
    // current display state
    curOrder: this.PRICE_LH,

    // object methods
    load: function() {
        $.getJSON("data/products.json",
            (data) => {
                // getting all products and storing them into 'content' array
                $.each(data, (i, item) => { 
                    this.content.push(item);
                });
            }
        );
    },

    getContent: function() {
        return this.content.slice();
    },
    
    getCurOrder: function() {
        return this.curOrder;
    },

    sortBy: function(criterion) {
        // sort by price (ascending or descending)
        if(criterion === this.PRICE_LH) { 
            this.content.sort( 
                (p1, p2) => { return p1.price - p2.price; }
            );
        }
        else if(criterion === this.PRICE_HL) {
            this.content.sort(
                (p1, p2) => { return p2.price - p1.price; }
            );
        }
        // sort by name (ascending or descending)
        else if(criterion === this.NAME_AZ) {
            this.content.sort(
                (p1, p2) => { return p1.name.localeCompare(p2.name); }
            );
        }
        else if(criterion === this.NAME_ZA) {
            this.content.sort(
                (p1, p2) => { return p2.name.localeCompare(p1.name); }
            )
        }
    },

    getOnly: function(category) {
        if(category === this.CAMERAS) {
            return $.grep(this.content, (p) => { 
                return p.category === "cameras"; 
            });
        }
        else if(category === this.CONSOLES) {
            return $.grep(this.content, (p) => { 
                return p.category === "consoles"; 
            });
        }
        else if(category === this.SCREENS) {
            return $.grep(this.content, (p) => { 
                return p.category === "screens"; 
            });
        }
        else if(category === this.COMPUTERS) {
            return $.grep(this.content, (p) => { 
                return p.category === "computers"; 
            });
        }
        else
            return this.content.slice();
    },
};
