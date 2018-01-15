module.exports.index = function( application, req, res ){
    var resultado;
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.listar(function(error, empresas){
        if( error ) {
            res.render('listarEmpresa', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            return;
        }
        res.render('listarEmpresa', { validacao : {}, empresas : empresas });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('editarEmpresa', { validacao : {}, empresas : {} });
}

module.exports.editar = function( application, req, res ){
    
    var empresa = { _id: req.params._id.split(':')[1] };

    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.editar( empresa, function(error, empresas){
        if( error ) {
            res.render('listarEmpresas', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
            return;
        }
        res.render('editarEmpresa', { validacao : {}, empresas : empresas });
    });
}

module.exports.salvar = function( application, req, res ){
    var dadosForms = req.body;
    req.assert('cnpj', 'cnpj é obrigatório').notEmpty();
    req.assert('razao', 'Razão é obrigatório').notEmpty();       
    req.assert('fantasia', 'Fantasia é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();

    if(erros){
        res.render('editarEmpresa', {validacao: erros,  empresas: dadosForms});
        return;
    }
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var empresa = { 'CNPJ': dadosForms.cnpj, 
                    'RAZAO': dadosForms.razao, 
                    'FANTASIA': dadosForms.fantasia,
                    'FONE': dadosForms.fone,
                    'EMAIL': dadosForms.email,
                    'CEP': dadosForms.cep,
                    'ENDERECO': dadosForms.endereco,
                    'NUMERO': dadosForms.numero,
                    'COMPLEMENTO': dadosForms.complemento,
                    'UF': dadosForms.uf,
                    'CIDADE': dadosForms.cidade,
                    'BAIRRO': dadosForms.bairro
                 }
        
    if( !dadosForms._id ) {
        empresaDao.salvar(empresa, function(error, result){
            
            if( error ) {
                res.render('editarEmpresa', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
                return;
            }
            res.redirect('/listarEmpresas');
        });
    } else {
        empresaDao.alterar( dadosForms._id, empresa, function(error, result){
            
            if( error ) {
                res.render('editarEmpresa', { validacao : [ {'msg': error.sqlMessage }], empresas : {} });
                return;
            }
            res.redirect('/listarEmpresas');
        });
    }
}

module.exports.excluir = function( application, req, res ){
    
    var empresa = { idEMPRESA: req.params._id.split(':')[1] };
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.excluir( empresa, function(error, empresas){
        if( error ) {
            res.render('listarEmpresas', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], empresas : {} });
            return;
        }
        res.redirect("/listarEmpresas");
    });
}
