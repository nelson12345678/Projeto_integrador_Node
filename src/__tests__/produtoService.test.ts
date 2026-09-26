import sequelize from "../config/database";
import Produto from "../models/produtoModel";
import {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
} from "../services/ProdutoService";

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

beforeEach(async () => {
    await Produto.destroy({
        where: {}
    });
});

describe("ProdutoService - CRUD", () => {

    test("deve criar um produto", async () => {
        const produto = await criar({
            nome: "Notebook",
            preco: 3500
        });

        expect(produto.nome).toBe("Notebook");
        expect(produto.preco).toBe(3500);
        expect(produto.id).toBeDefined();
    });

    test("deve listar os produtos", async () => {
        await criar({
            nome: "Mouse",
            preco: 120
        });

        const produtos = await listar();

        expect(produtos).toHaveLength(1);
        expect(produtos[0].nome).toBe("Mouse");
    });

    test("deve buscar produto por ID", async () => {
        const produto = await criar({
            nome: "Teclado",
            preco: 180
        });

        const encontrado = await buscarPorId(produto.id);

        expect(encontrado).not.toBeNull();
        expect(encontrado?.nome).toBe("Teclado");
    });

    test("deve retornar null ao buscar produto inexistente", async () => {
        const produto = await buscarPorId(999);

        expect(produto).toBeNull();
    });

    test("deve atualizar um produto", async () => {
        const produto = await criar({
            nome: "Monitor",
            preco: 1000
        });

        const atualizado = await atualizar(produto.id, {
            nome: "Monitor 24",
            preco: 1200
        });

        expect(atualizado).not.toBeNull();
        expect(atualizado?.nome).toBe("Monitor 24");
        expect(atualizado?.preco).toBe(1200);
    });

    test("deve retornar null ao atualizar produto inexistente", async () => {
        const resultado = await atualizar(999, {
            nome: "Produto",
            preco: 100
        });

        expect(resultado).toBeNull();
    });

    test("deve excluir um produto", async () => {
        const produto = await criar({
            nome: "Webcam",
            preco: 250
        });

        const resultado = await excluir(produto.id);

        expect(resultado).toBe(true);

        const encontrado = await buscarPorId(produto.id);

        expect(encontrado).toBeNull();
    });

    test("deve retornar false ao excluir produto inexistente", async () => {
        const resultado = await excluir(999);

        expect(resultado).toBe(false);
    });

    test("deve rejeitar produto sem nome", async () => {
        await expect(
            criar({
                nome: "",
                preco: 100
            })
        ).rejects.toThrow("nome e preco são obrigatorios");
    });
});