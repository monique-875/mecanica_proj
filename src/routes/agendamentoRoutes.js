import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  listar,
  criar,
  atualizar,
  remover,
} from "../controllers/agendamentoController.js";
const router = Router();
router.use(authenticate);
router.get("/", listar);
router.post("/", criar);
router.put("/:id", atualizar);
router.delete("/:id", remover);
export default router;
