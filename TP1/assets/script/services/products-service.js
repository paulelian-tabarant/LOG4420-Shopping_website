const productsList = {
    content: [],
    PRICE_LH : 0,
    PRICE_HL : 1,
    NAME_AZ : 2,
    NAME_ZA : 3,

    load: function() {
        console.log(this);
        $.getJSON("data/products.json",
            (data) => {
                // getting all products and storing them into 'content' array
                $.each(data, (i, item) => { 
                    this.content.push(item);
                });
            }
        );
    },

    getSortedBy: function(criterion) {
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
        // just returning a copy of local content
        return this.content.slice();
    }
};
