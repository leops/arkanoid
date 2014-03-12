var express = require('express'),
	app = express(),
	routes = require('./routes.json'),
	port = process.env.PORT || 3000;

app.use(express.compress());
app.use(express.logger('tiny'));
app.use(require('connect-livereload')());
app.use(app.router);
app.use(express.static('dist'));
app.use('/img', express.static('img'));
app.use('/server', express.static('server'));
app.use('/bower', express.static('bower_components'));
app.use('/lvledit', express.static('lvledit'));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.set('view engine', 'jade');

function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, {
			error: 'Server Error'
		});
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', {
		error: err
	});
}

function handler(req, res) {
	res.render(routes[req.route.path].template, routes[req.route.path].args);
}

for (var i in routes)
	app.get(i, handler);

function kiddies(req, res) {
	res.send(418, "I'm a teapot");
}

app.get(/^\/w00tw00t\.at\.blackhats\.romanian\.anti-sec/, kiddies);
app.get('/phpMyAdmin/scripts/setup.php', kiddies);
app.get('/phpmyadmin/scripts/setup.php', kiddies);
app.get('/pma/scripts/setup.php', kiddies);
app.get('/myadmin/scripts/setup.php', kiddies);
app.get('/MyAdmin/scripts/setup.php', kiddies);

app.listen(port, function () {
	console.log('Listening on port ' + port);
});
