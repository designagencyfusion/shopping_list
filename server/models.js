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
},
{
	toJSON: { virtuals: true }
});

itemSchema.virtual('created').get(function() {
	var milliseconds = parseInt(this._id.toString().substring(0, 8), 16) * 1000;
	return new Date(milliseconds);
});

module.exports = {
	shoppingList: mongoose.model('ShoppingList', shoppingListSchema),
	item: mongoose.model('Item', itemSchema)
};
