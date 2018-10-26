const orders = {
    storageKey: "orders",
    content: [],
    curNumber: 1,
    load: function() {
        if(typeof localStorage!='undefined') {
			let contentStr = localStorage.getItem(this.storageKey);
			if(contentStr != null) {
				let savedContent = JSON.parse(contentStr);
                this.content = savedContent;
                this.curNumber = savedContent[savedContent.length-1].number + 1;
			}
		}
    },
    save: function() {
        contentStr = JSON.stringify(this.content);
        localStorage.setItem(this.storageKey, contentStr);
    },
    add: function(name, surname)  {
        this.content.push({
            name: name,
            surname: surname,
            number: this.curNumber
        });
        this.save();
        this.curNumber++;
    },
    getLast: function() {
        return this.content[this.content.length-1];
    }
}