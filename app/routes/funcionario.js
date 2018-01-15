module.exports = function(application){

	application.get('/listarFuncionarios', function(req, res){
		application.app.controllers.funcionario.index(application, req, res);
	});

	application.get('/novoFuncionario', function(req, res){
		application.app.controllers.funcionario.novo(application, req, res);
	});

	application.post('/salvarFuncionarios', function(req, res){
		application.app.controllers.funcionario.salvar(application, req, res);
	});

	application.get('/excluirFuncionarios/:_id', function(req, res){
		application.app.controllers.funcionario.excluir(application, req, res);
	});

	application.get('/editarFuncionario/:_id', function(req, res){
		application.app.controllers.funcionario.editar(application, req, res);
	});
}
