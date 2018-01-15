module.exports = function(application){

	application.get('/listarEmpresas', function(req, res){
		application.app.controllers.empresa.index(application, req, res);
	});

	application.get('/novoEmpresa', function(req, res){
		application.app.controllers.empresa.novo(application, req, res);
	});

	application.post('/salvarEmpresas', function(req, res){
		application.app.controllers.empresa.salvar(application, req, res);
	});

	application.get('/excluirEmpresas/:_id', function(req, res){
		application.app.controllers.empresa.excluir(application, req, res);
	});

	application.get('/editarEmpresa/:_id', function(req, res){
		application.app.controllers.empresa.editar(application, req, res);
	});
}
