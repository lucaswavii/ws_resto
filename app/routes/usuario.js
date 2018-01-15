module.exports = function(application){

	application.get('/listarUsuarios', function(req, res){
		application.app.controllers.usuario.index(application, req, res);
	});

	application.get('/novoUsuario', function(req, res){
		application.app.controllers.usuario.novo(application, req, res);
	});

	application.post('/salvarUsuarios', function(req, res){
		application.app.controllers.usuario.salvar(application, req, res);
	});

	application.get('/excluirUsuarios/:_id', function(req, res){
		application.app.controllers.usuario.excluir(application, req, res);
	});

	application.get('/editarUsuario/:_id', function(req, res){
		application.app.controllers.usuario.editar(application, req, res);
	});
}
