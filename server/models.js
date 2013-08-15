var mongoose = require('mongoose');
var moment = require('moment');

var shoppingListSchema = mongoose.Schema({
	title:          String,
	creatorEmail:   String,
	modified:       Date
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

itemSchema.virtual('archived').get(function() {
	var threeWeeksAgo = moment().subtract(3, 'week');
	var oldItem = moment(this.created).isBefore(threeWeeksAgo);
	return this.bought && oldItem;
});

module.exports = {
	shoppingList: mongoose.model('ShoppingList', shoppingListSchema),
	item: mongoose.model('Item', itemSchema)
};
