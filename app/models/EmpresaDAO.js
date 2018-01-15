function EmpresaDAO( connection ){
	this._connection = connection; 
}

EmpresaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from empresa order by idEmpresa', callback);	
}

EmpresaDAO.prototype.salvar = function( empresa, callback) {	
	this._connection.query('insert into empresa set ?', empresa, callback);	
}

EmpresaDAO.prototype.alterar = function( idEmpresa, empresa, callback) {	
	this._connection.query('update empresa set ? where idEMPRESA = ?', [ empresa, idEmpresa], callback);	
}

EmpresaDAO.prototype.editar = function( empresa, callback) {
	this._connection.query('select * from empresa where idEMPRESA = ' + empresa._id, callback);
}

EmpresaDAO.prototype.excluir = function( empresa, callback) {	
	this._connection.query('delete from empresa where idEMPRESA = ? ', empresa.idEMPRESA, callback);	
}

module.exports = function(){
	return EmpresaDAO;
};
