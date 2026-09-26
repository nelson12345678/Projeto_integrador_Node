import { Router } from "express";
import * as produtoController
    from "../controllers/produtoController";
    
    const router = Router();

    router.get("/", produtoController.listar);

    router.get("/", produtoController.listar);

    router.get(
        "/:id",
        produtoController.buscarPorId
    );

    router.post(
        "/",
        produtoController.criar
    );

    export default router;