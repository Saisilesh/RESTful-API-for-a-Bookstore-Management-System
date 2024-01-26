import express from "express";
import { addBook, deleteBookbyId, getAllBooks, getBookbyISBN, updateBook } from "../controller/books-controller";
import {validateToken}  from "../middleware/validatetoken";
const bookRouter = express.Router();

//bookRouter.use(validateToken);
bookRouter.get("/",getAllBooks);
bookRouter.post("/add",addBook);
bookRouter.put("/update/:id",updateBook);
bookRouter.get("/:isbn",getBookbyISBN);
bookRouter.delete("/:id", deleteBookbyId);

export default bookRouter;