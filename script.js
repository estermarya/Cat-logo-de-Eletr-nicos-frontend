
// 1. ARRAY DE OBJETOS
const produtos = [
    {
        nome: "Samsung Galaxy A15",
        categoria: "Celular",
        marca: "Samsung",
        preco: 1000
    },
    {
        nome: "iPhone 13",
        categoria: "Celular",
        marca: "Apple",
        preco: 3000
    },
    {
        nome: "Lenovo IdeaPad",
        categoria: "Notebook",
        marca: "Lenovo",
        preco: 2500
    },
    {
        nome: "iPad 10",
        categoria: "Tablet",
        marca: "Apple",
        preco: 2000
    },
    {
        nome: "Acer Aspire 5",
        categoria: "Notebook",
        marca: "Acer",
        preco: 3500
    }
];


// 2. FUNÇÃO PARA CALCULAR O DESCONTO
function calcularDesconto(preco, desconto = 10) {
    return preco - (preco * desconto / 100);
}


// 3. FUNÇÃO PARA CLASSIFICAR OS PREÇOS
function classificarPreco(preco) {

    if (preco < 1500) {
        return "barato";

    } else if (preco <= 3000) {
        return "medio";

    } else {
        return "caro";
    }
}


// 4. MAP - CALCULAR O PREÇO DE CADA PRODUTO
const produtosAnalisados = produtos.map(function(produto) {

    const precoFinal = calcularDesconto(produto.preco);

    const classificacao = classificarPreco(precoFinal);

    return {
        ...produto,
        precoFinal: precoFinal,
        classificacao: classificacao
    };

});


// 5. FILTER - SEPARAR PRODUTOS BARATOS
const produtosBaratos = produtosAnalisados.filter(function(produto) {
    return produto.classificacao === "barato";
});


// 6. REDUCE - SOMAR OS PREÇOS
const valorTotal = produtos.reduce(function(total, produto) {
    return total + produto.preco;
}, 0);


// SOMAR OS PREÇOS COM DESCONTO
const totalComDesconto = produtosAnalisados.reduce(function(total, produto) {
    return total + produto.precoFinal;
}, 0);


// 7. TESTAR AS FUNÇÕES NO CONSOLE
console.log(calcularDesconto(100));
console.log(calcularDesconto(100, 20));

console.log(classificarPreco(900));
console.log(classificarPreco(2000));
console.log(classificarPreco(4000));

console.log(produtosAnalisados);
console.log(produtosBaratos);


// 8. SELECIONAR AS ÁREAS DO HTML
const areaResultado = document.querySelector("#resultado");
const areaResumo = document.querySelector("#resumo");
const areaProdutosBaratos = document.querySelector("#produtos-baratos");
const textoQuantidadeBaratos = document.querySelector("#quantidade-baratos");


// VERIFICAR SE AS ÁREAS EXISTEM
if (
    areaResultado !== null &&
    areaResumo !== null &&
    areaProdutosBaratos !== null &&
    textoQuantidadeBaratos !== null
) {

    // 9. FUNÇÃO PARA CRIAR OS CARDS
    function criarCardProduto(produto) {

        const card = document.createElement("div");

        card.classList.add("produto-card");
        card.classList.add(produto.classificacao);

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + produto.categoria;

        const marca = document.createElement("p");
        marca.textContent = "Marca: " + produto.marca;

        const preco = document.createElement("p");
        preco.textContent = "Preço original: R$ " + produto.preco.toFixed(2);

        const precoFinal = document.createElement("p");
        precoFinal.textContent = "Com desconto: R$ " + produto.precoFinal.toFixed(2);

        const classificacao = document.createElement("span");
        classificacao.classList.add("classificacao");
        classificacao.textContent = produto.classificacao;

        card.append(
            titulo,
            categoria,
            marca,
            preco,
            precoFinal,
            classificacao
        );

        return card;
    }


    // 10. MOSTRAR TODOS OS PRODUTOS
    produtosAnalisados.forEach(function(produto) {

        const card = criarCardProduto(produto);

        areaResultado.append(card);

    });


    // 11. MOSTRAR SOMENTE OS PRODUTOS BARATOS
    produtosBaratos.forEach(function(produto) {

        areaProdutosBaratos.append(criarCardProduto(produto));

    });

    textoQuantidadeBaratos.textContent =
        "Encontramos " + produtosBaratos.length + " produto(s) barato(s).";


    // 12. MOSTRAR O RESUMO
    const resumoItens = [
        {
            titulo: "Produtos cadastrados",
            valor: produtos.length
        },
        {
            titulo: "Valor total",
            valor: "R$ " + valorTotal.toFixed(2)
        },
        {
            titulo: "Total com desconto",
            valor: "R$ " + totalComDesconto.toFixed(2)
        },
        {
            titulo: "Produtos baratos",
            valor: produtosBaratos.length
        }
    ];

    resumoItens.forEach(function(item) {

        const card = document.createElement("div");

        card.classList.add("resumo-card");

        const titulo = document.createElement("span");
        titulo.textContent = item.titulo;

        const valor = document.createElement("strong");
        valor.textContent = item.valor;

        card.append(titulo, valor);

        areaResumo.append(card);

    });

} else {

    console.error("Não foi possível encontrar as áreas do HTML.");

}
