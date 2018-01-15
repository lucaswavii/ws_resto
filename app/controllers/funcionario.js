module.exports.index = function( application, req, res ){
    var resultado;
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.listar(function(error, funcionarios){
        if( error ) {
            res.render('listarFuncionario', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {} });
            return;
        }
        res.render('listarFuncionario', { validacao : {}, funcionarios : funcionarios });
    });
}

module.exports.novo = function( application, req, res ){    
    res.render('editarFuncionario', { validacao : {}, funcionarios : {} });
}

module.exports.editar = function( application, req, res ){
    
    var funcionario = { _id: req.params._id.split(':')[1] };

    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.editar( funcionario, function(error, funcionarios){
        if( error ) {
            res.render('listarFuncionario', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {} });
            return;
        }
        res.render('editarFuncionario', { validacao : {}, funcionarios : funcionarios });
    });
}

module.exports.salvar = function( application, req, res ){
    var dadosForms = req.body;
    req.assert('cpf', 'cpf é obrigatório').notEmpty();
    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();

    if(erros){
        res.render('editarFuncionario', {validacao: erros,  funcionarios: dadosForms});
        return;
    }
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var funcionario = { 'CPF': dadosForms.cpf, 
                    'NOME': dadosForms.nome, 
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
        funcionarioDao.salvar(funcionario, function(error, result){
            
            if( error ) {
                res.render('editarFuncionario', { validacao : [ {'msg': error.sqlMessage }], funcionarios : dadosForms });
                return;
            }
            res.redirect('/listarFuncionarios');
        });
    } else {
        funcionarioDao.alterar( dadosForms._id, funcionario, function(error, result){
            
            if( error ) {
                res.render('editarFuncionario', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {} });
                return;
            }
            res.redirect('/listarFuncionarios');
        });
    }
}

module.exports.excluir = function( application, req, res ){
    
    var empresa = { idFUNCIONARIO: req.params._id.split(':')[1] };
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.excluir( empresa, function(error, funcionarios){
        if( error ) {
            res.render('listarFuncionarios', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], funcionarios : {} });
            return;
        }
        res.redirect("/listarFuncionarios");
    });
}
