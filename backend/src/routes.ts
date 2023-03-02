import { Router, Request, Response } from "express";

import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

// router.get("/teste", (req: Request, res: Response) =>{
//   return res.json({ ok: true });
// })

// -- Rota Login --
router.post("/session", new AuthUserController().handle)


export { router };