module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.get('/index', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});
}
