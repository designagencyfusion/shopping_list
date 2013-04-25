var fs = require('fs');

exports.init = function(app) {

	app.get('*', function(req, res) {
		var path = req.params[0].replace(/^\//, '').replace(/\.html$/, '.jade') || 'index.jade';
		if (fs.existsSync(app.get('views') + '/' + path)) {
			res.render(path);
		} else {
			res.send(404);
		}
	});

};
