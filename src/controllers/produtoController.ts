import { Request, Response } from "express";
import * as service from "../services/ProdutoService";

export async function listar(req: Request, res: Response) {
    const produtos = await service.listar();

    res.status(200).json(produtos);
}

export async function buscarPorId(req: Request, res: Response) {
    const produto = await service.buscarPorId(Number(req.params.id));

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

export async function criar(req: Request, res: Response) {
    try {
        const produto = await service.criar(req.body);

        res.status(201).json(produto);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                mensagem: error.message
            });
        }

        return res.status(400).json({
            mensagem: "Erro ao criar produto"
        });
    }
}

export async function atualizar(req: Request, res: Response) {
    try {
        const produto = await service.atualizar(
            Number(req.params.id),
            req.body
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.status(200).json(produto);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                mensagem: error.message
            });
        }

        return res.status(400).json({
            mensagem: "Erro ao atualizar produto"
        });
    }
}

export async function excluir(req: Request, res: Response) {
    const excluido = await service.excluir(Number(req.params.id));

    if (!excluido) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(204).send();
}