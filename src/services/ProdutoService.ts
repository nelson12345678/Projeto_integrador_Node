import Produto from "../models/produtoModel";

async function listar() {
    return await Produto.findAll();
}

async function buscarPorId(id: number) {
    return await Produto.findByPk(id);
}

async function criar(dados: { nome: string; preco: number }) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("nome e preco são obrigatorios");
    }

    return await Produto.create({
        nome: dados.nome,
        preco: dados.preco
    });
}

async function atualizar(
    id: number,
    dados: { nome: string; preco: number }
) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return null;
    }

    await produto.update(dados);

    return produto;
}

async function excluir(id: number) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return false;
    }

    await produto.destroy();

    return true;
}

export {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};