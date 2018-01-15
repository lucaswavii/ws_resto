function UsuarioDAO( connection ){
	this._connection = connection; 
}

UsuarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from usuario order by idUSUARIO', callback);	
}

UsuarioDAO.prototype.salvar = function( usuario, callback) {	
	this._connection.query('insert into usuario set ?', usuario, callback);	
}

UsuarioDAO.prototype.alterar = function( idUsuario, usuario, callback) {	
	this._connection.query('update usuario set ? where idUSUARIO = ?', [ usuario, idUsuario], callback);	
}

UsuarioDAO.prototype.editar = function( usuario, callback) {
	this._connection.query('select * from usuario where idUSUARIO = ' + usuario._id, callback);
}

UsuarioDAO.prototype.excluir = function( usuario, callback) {	
	this._connection.query('delete from usuario where idUSUARIO = ? ', usuario.idGRUPO, callback);	
}

module.exports = function(){
	return UsuarioDAO;
};
