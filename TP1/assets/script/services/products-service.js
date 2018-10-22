const productsList = {
    content: [],
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
    }
};
