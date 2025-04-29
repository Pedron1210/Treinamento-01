const db = require('./conexao');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//criar um endpoint para listar todos os produtos
app.get('/funcionarios', (req, res)=>{
    db.query('SELECT * FROM vw_func_setor_assoc', (erro, resultado)=>{
        if(erro){
            res.json({"mensagem":"Falha ao consultar"});
            return;      
        }
        return res.json(resultado);
    });
});//fim do endpoint GET/produtos

app.get('/produtos/:id', (req, res)=>{
         const id = req.params.id;
         db.query('SELECT * FROM tb_produtos WHERE id_produto=?',[id],
            (erro, resultado)=>{
                if(erro){
                    res.json({"mensagem":"falha ao consultar"});
                    return;
            }
            return res.json(resultado);
        });    
});//fim do endpoint GET /produtos/:id

//criar um endpoint GET /produtos/:nome para pesquisar pelo nome 
app.get('/produtos/pesquisar/:nome', (req, res)=>{
    const nome = req.params.nome;
    var pesquisar = "%"+nome+"%";
    db.query('SELECT * FROM tb_produtos WHERE nome_produto LIKE ?',
        [pesquisar], (erro, resultado)=>{
            if(erro){
                return res.json({"mensagem":"falha ao consultar"});
            }
            return res.json(resultado);
        });
}); //fim do endpoint GET /produtos/:nome

//criar um endpoint GET /categorias
app.get('/categorias', (req, res)=>{
    db.query('SELECT * FROM tb_categorias',
        (erro, resultado)=>{
            if(erro){
                res.json({"mensagem":"falha ao consultar"});
                return;
            }
            return res.json(resultado);
        });       
});//fim do endpoint GET /categorias

//criar um endpoint GET /categorias/:id
app.get('/categorias/:id', (req, res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM tb_categorias WHERE categoria=?', [id],
        (erro, resultado)=>{
             if(erro){return res.json({"mensagem":"falha ao consultar"})};
             return res.json(resultado);
        });
});
//fim do endpoint GET /categorias/:id

app.listen(3000, ()=>{
    console.log('servidor rodando na porta 3000');
});