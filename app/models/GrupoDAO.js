function GrupoDAO( connection ){
	this._connection = connection; 
}

GrupoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from grupo order by idGrupo', callback);	
}

GrupoDAO.prototype.salvar = function( grupo, callback) {	
	this._connection.query('insert into grupo set ?', grupo, callback);	
}

GrupoDAO.prototype.alterar = function( idGrupo, grupo, callback) {	
	this._connection.query('update grupo set ? where idGRUPO = ?', [ grupo, idGrupo], callback);	
}

GrupoDAO.prototype.editar = function( grupo, callback) {
	this._connection.query('select * from grupo where idGRUPO = ' + grupo._id, callback);
}

GrupoDAO.prototype.excluir = function( grupo, callback) {	
	this._connection.query('delete from grupo where idGRUPO = ? ', grupo.idGRUPO, callback);	
}

module.exports = function(){
	return GrupoDAO;
};
