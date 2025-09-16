// routes/bookRoutes.js
import { Router } from "express";
import { getBooks, postBooks, getBooksDetailsIndividual, updateBooks , deleteData} from "../controllers/bookcontrollers.js";

const router = Router();

router.get("/books", getBooks);   // fetch all books
router.post("/books", postBooks); // add multiple books
router.get("/books/:id", getBooksDetailsIndividual); // fetch book details by ID
router.put("/books/:id", updateBooks)
router.delete("/books/:id", deleteData )

export default router;
