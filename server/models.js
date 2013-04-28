var mongoose = require('mongoose');

var shoppingListSchema = mongoose.Schema({
	title:          String,
	creatorEmail:   String
});

var itemSchema = mongoose.Schema({
	title:          String,
	amount:         Number,
	unit:           String,
	bought:         Boolean,
	shoppingListId: { type: String, ref: 'ShoppingList' }
});

module.exports = {
	shoppingList: mongoose.model('ShoppingList', shoppingListSchema),
	item: mongoose.model('Item', itemSchema)
};
