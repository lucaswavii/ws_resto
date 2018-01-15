function FuncionarioDAO( connection ){
	this._connection = connection; 
}

FuncionarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from funcionario order by idFuncionario', callback);	
}

FuncionarioDAO.prototype.salvar = function( funcionario, callback) {	
	console.log(funcionario)
	this._connection.query('insert into funcionario set ?', funcionario, callback);	
}

FuncionarioDAO.prototype.alterar = function( idFuncionario, funcionario, callback) {	
	this._connection.query('update funcionario set ? where idFUNCIONARIO = ?', [ funcionario, idFuncionario], callback);	
}

FuncionarioDAO.prototype.editar = function( funcionario, callback) {
	this._connection.query('select * from funcionario where idFUNCIONARIO = ' + funcionario._id, callback);
}

FuncionarioDAO.prototype.excluir = function( funcionario, callback) {	
	this._connection.query('delete from funcionario where idFUNCIONARIO = ? ', funcionario.idFUNCIONARIO, callback);	
}

module.exports = function(){
	return FuncionarioDAO;
};
