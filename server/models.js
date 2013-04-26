var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	title:  String,
	amount: Number,
	unit:   String,
	bought: Boolean
});

module.exports = {
	item: mongoose.model('Item', itemSchema)
};
