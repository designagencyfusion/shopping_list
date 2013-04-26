var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	foo: Boolean
});

module.exports = {
	item: mongoose.model('Item', itemSchema)
};
