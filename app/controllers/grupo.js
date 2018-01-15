module.exports.index = function( application, req, res ){
    var resultado;
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar(function(error, grupos){
        if( error ) {
            res.render('listarGrupo', { validacao : [ {'msg': error.sqlMessage }], grupos : {} });
            return;
        }
        res.render('listarGrupo', { validacao : {}, grupos : grupos });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('editarGrupo', { validacao : {}, grupos : {} });
}

module.exports.editar = function( application, req, res ){
    
    var grupo = { _id: req.params._id.split(':')[1] };

    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.editar( grupo, function(error, grupos){
        if( error ) {
            res.render('listarGrupo', { validacao : [ {'msg': error.sqlMessage }], grupos : {} });
            return;
        }
        res.render('editarGrupo', { validacao : {}, grupos : grupos });
    });
}

module.exports.salvar = function( application, req, res ){
    var dadosForms = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    req.assert('nome', 'Resumo deve conter entre 10 e 60 caracteres').len(10, 60);
    
    var erros = req.validationErrors();

    if(erros){
        res.render('editarGrupo', {validacao: erros,  grupos: dadosForms});
        return;
    }
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    if( !dadosForms._id ) {
        var grupo = { 'NOME': dadosForms.nome }
        grupoDao.salvar(grupo, function(error, result){
            
            if( error ) {
                res.render('editarGrupo', { validacao : [ {'msg': error.sqlMessage }], grupos : {} });
                return;
            }
            res.redirect('/listarGrupos');
        });
    } else {
        var grupo = { 'NOME': dadosForms.nome };        
        grupoDao.alterar( dadosForms._id, grupo, function(error, result){
            
            if( error ) {
                res.render('editarGrupo', { validacao : [ {'msg': error.sqlMessage }], grupos : {} });
                return;
            }
            res.redirect('/listarGrupos');
        });
    }
}

module.exports.excluir = function( application, req, res ){
    
    var grupo = { idGRUPO: req.params._id.split(':')[1] };
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.excluir( grupo, function(error, grupos){
        if( error ) {
            res.render('listarGrupos', { validacao : [ {'msg':error.error }], grupos : grupos });
        }
        res.redirect("/listarGrupos");
    });
}
