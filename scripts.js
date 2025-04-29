$(document).ready(function(){
    $.ajax({
        url: "http://localhost:3000/funcionarios",
        type: "GET",
        dataType: "json",
        success: function(dados){
            dados.forEach(item =>{
                $("#caixa_conteudo").append(`
                    <div class = 'cartoes'>
                    <h2>${item.nome_func}</h2>
                    CPF funcionario${item.cpf_do_funcionario}<br>
                    <span class = 'situacao'> ${item.situacao} </span> <br>
                    <b>Qtd. Data de nascimento:</b> ${item.data_nasc}<br>
                    <b>Setor:</b> ${item.nome_setor}
                    </div>
                    `);
            });
        },
        error: function(){
            alert("Falha ao consultar")
        }
    });
});