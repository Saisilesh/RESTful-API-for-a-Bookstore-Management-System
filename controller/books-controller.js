import mongoose from "mongoose";
import book from "../model/book-model";


export const getAllBooks = async (req, res, next) => {
    let books;
    try{
        books = await book.find();
    }
    catch (err){
        console.log(err);
    }

    if(!books)
    {
        return res.status(404).json({message: "No Books Found"});
    }

    return res.status(200).json({books});
};

export const addBook = async (req, res, next) =>
{
    try {
        if (
          !req.body.title ||
          !req.body.author ||
          !req.body.ISBN ||
          !req.body.price ||
          !req.body.quantity
        ) {
          return res.status(400).send({
            message: 'Send all required fields: title, author, ISBN, price, quantity',
          });
        }
        const newBook = {
          title: req.body.title,
          author: req.body.author,
          ISBN: req.body.ISBN,
          price: req.body.price,
          quantity: req.body.quantity,
        };
    
        const Book = await book.create(newBook);
    
        return res.status(200).send(Book);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
};

export const getBookbyISBN = async (req, res, next) => {
    let getBook;
    try {
        getBook = await book.find({
            "ISBN": req.params.isbn
          })
    }catch(err){
        return console.log(err);
    }
    if(!getBook){
        return res.status(404).json({message: "Coudn't find the Book"});
    }

    return res.status(200).json({getBook});
};

export const deleteBookbyId = async (req, res, next) => {

    let delBook;
    try {
        delBook = await book.findByIdAndDelete(req.params.id);
        //await delBook.book.pull(delBook);
    }catch(err){
        return console.log(err);
    }

    if(!delBook){
        return res.status(500).json({message: "Unable to Delete the book"});
    }

    return res.status(200).json({message: "Successfully deleted the book"});
};

export const updateBook = async (req, res, next) => {
    const {title, author, ISBN, price, quantity} = req.body;
    const bookId = req.params.id;
    let existBook;
    try{
        existBook = await book.findByIdAndUpdate(bookId,{
            title,
            author,
            ISBN,
            price,
            quantity
        })
    }catch(err){
        return console.log(err);
    }

    if(!existBook){
        return res.status(500).json({message: "Unable to update the Book"})
    }

    return res.status(200).json({existBook});
   
};
