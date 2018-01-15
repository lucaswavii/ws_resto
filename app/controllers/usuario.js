module.exports.index = function( application, req, res ){
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.listar(function(error, usuarios){
        if( error ) {
            res.render('listarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
            return;
        }
        res.render('listarUsuario', { validacao : {}, usuarios : usuarios });
    });
}

module.exports.novo = function( application, req, res ){    
    
    var connection      = application.config.dbConnection();    
    var grupoDao        = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar( function(error, grupos){        
        
        if( error ) {
            res.render('listarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
            return;
        }

        var empresaDao        = new application.app.models.EmpresaDAO(connection);
        empresaDao.listar( function(error, empresas){
            if( error ) {
                res.render('listarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
                return;
            }
            
            var funcionarioDao        = new application.app.models.FuncionarioDAO(connection);
            funcionarioDao.listar( function(error, funcionarios){
                if( error ) {
                    res.render('listarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
                    return;
                }
                res.render('editarUsuario', { validacao : {}, usuarios : {}, grupos:  grupos, empresas:empresas, funcionarios: funcionarios });
            });
        }); 
    });
}

module.exports.editar = function( application, req, res ){
    
    var usuario = { _id: req.params._id.split(':')[1] };

    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.editar( usuario, function(error, usuarios){
        if( error ) {
            res.render('listarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
            return;
        }
        res.render('editarUsuario', { validacao : {}, usuarios : usuarios });
    });
}

module.exports.salvar = function( application, req, res ){
    var dadosForms = req.body;

    req.assert('nome'       , 'Nome é obrigatório').notEmpty();       
    req.assert('nome'       , 'Resumo deve conter entre 10 e 60 caracteres').len(10, 60);
    req.assert('senha'      , 'Senha é obrigatório').notEmpty();       
    req.assert('grupo'      , 'Grupo é obrigatório').notEmpty();       
    req.assert('empresa'    , 'Empresa é obrigatório').notEmpty();       
    req.assert('funcionario', 'Funcionário é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();

    if(erros){
        res.render('editarUsuario', {validacao: erros,  usuarios: dadosForms});
        return;
    }
    
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    var usuario = { 'NOME': dadosForms.nome, 'SENHA': dadosForms.senha, 'idGRUPO': dadosForms.grupo, 'idFUNCIONARIO': dadosForms.funcionario, 'idEMPRESA': dadosForms.empresa }
        
    if( !dadosForms._id ) {
        
        usuarioDao.salvar(usuario, function(error, result){
            
            if( error ) {
                res.render('editarUsuario', { validacao : [ {'msg': error.sqlMessage }], usuarios : {} });
                return;
            }
            res.redirect('/listarUsuarios');
        });
    } else {
        usuarioDao.alterar( dadosForms._id, usuario, function(error, result){
            
            if( error ) {
                res.render('editarUsuario', { validacao : [ {'msg': error.sqlMessage }], grupos : {} });
                return;
            }
            res.redirect('/listarUsuarios');
        });
    }
}

module.exports.excluir = function( application, req, res ){
    
    var usuario = { idUSUARIO: req.params._id.split(':')[1] };
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.excluir( usuario, function(error, usuarios){
        if( error ) {
            res.render('listarUsuarios', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], usuarios : {} });
            return;
        }
        res.redirect("/listarUsuarios");
    });
}
