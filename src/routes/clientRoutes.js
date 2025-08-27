
import { Router } from 'express';

import { postClient, getClients, deletewishlist } from '../controllers/clientcontrollers.js';

const booksRouter = Router();


booksRouter.post("/addwishlist", postClient)
booksRouter.get("/getwishlist", getClients)
booksRouter.delete("/deletewishlist/:id", deletewishlist)

export default booksRouter;