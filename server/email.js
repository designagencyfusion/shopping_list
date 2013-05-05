var fs = require('fs');
var jade = require('jade');
var stylus = require('stylus');
var premailer = require('premailer-api');
var translations = require('./translations');

module.exports = function(opts, callback) {

	var translation = translations(opts.lang);
	var address = opts.addressToService + '#/shopping-lists/' + opts.id;
	var text = '';

	text += translation.title + '\n\n---\n\n';
	text += (translation.email.hi + '\n\n');
	text += (translation.email.newListCreated + '\n\n');
	text += (translation.email.shareInfo + '\n');
	text += (translation.email.linkText + address + '\n\n');
	text += (translation.email.thankYous + '\n\n---\n\n');
	text += (translation.email.disclaimer + opts.addressToService);

	var cssPath = 'client/styles/_email.styl';
	stylus(fs.readFileSync(cssPath, 'utf8')).set('filename', cssPath).include(require('nib').path).render(function(err, css) {
		var styles = '<style type="text/css">' + css + '</style>\n';
		var html = jade.compile(fs.readFileSync('client/views/_email.jade', 'utf8'))({
			styles: styles,
			name: opts.name,
			address: address,
			addressToService: opts.addressToService,
			translations: translation,
			lang: opts.lang
		});
		premailer.prepare({ html: html }, function(err, preMail) {
			callback({
				to: opts.creatorEmail,
				from: 'noreply@example.com',
				subject: translation.email.newShoppingList + ': ' + opts.name,
				text: text,
				html: preMail.html
			});
		});
	});
};
