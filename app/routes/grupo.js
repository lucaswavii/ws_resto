module.exports = function(application){

	application.get('/listarGrupos', function(req, res){
		application.app.controllers.grupo.index(application, req, res);
	});

	application.get('/novoGrupo', function(req, res){
		application.app.controllers.grupo.novo(application, req, res);
	});

	application.post('/salvarGrupos', function(req, res){
		application.app.controllers.grupo.salvar(application, req, res);
	});

	application.get('/excluirGrupos/:_id', function(req, res){
		application.app.controllers.grupo.excluir(application, req, res);
	});

	application.get('/editarGrupo/:_id', function(req, res){
		application.app.controllers.grupo.editar(application, req, res);
	});
}
