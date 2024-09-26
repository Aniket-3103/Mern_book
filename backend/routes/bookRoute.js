import { Router } from "express"
import { Book } from "../models/Book.js"

const router=Router()

//getting all the books
router.get("/", async (req, res)=>{
    try{
        const books=await Book.find({})

        res.status(200).json({"count":books.length,"data":books})

    }catch(error){
        console.log(error)
        res.status(500).send("Error message: " + error.message)
    }
})

//retrieving single book
router.get("/:id", async (req, res)=>{
    try{
        const {id}=req.params

        const books=await Book.findById(id)

        res.status(200).json(books)

    }catch(error){
        console.log(error)
        res.status(500).send("Error message: " + error.message)
    }
})


//updating a book
router.put("/:id", async (req, res)=>{
    try{

        let {title, publishYear, author}=req.body;

        if(!title || !publishYear || !author){
            res.status(400).send("Please send all the details (title, publishYear, author)")
        }

        const {id}=req.params

        const books=await Book.findByIdAndUpdate(id, {title, publishYear, author}, {new: true})
        if(!books){
            return res.status(404).json({message: "Book not found"})
        }

        res.status(200).json({message: "Book updated successfully"})

    }catch(error){
        console.log(error)
        res.status(500).send("Error message: " + error.message)
    }
})


//delete a book
router.delete("/:id", async (req, res)=>{
    try{
        const {id}=req.params

        const result=await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({message: "Book not found"})
        } 

        res.status(200).json({message: "Book deleted successfully"})

    }catch(error){
        console.log(error)
        res.status(500).send("Error message: " + error.message)
    }
})


//adding book
router.post("/",async(req, res)=>{
    try{
        let {title, publishYear, author}=req.body;

        if(!title || !publishYear || !author){
            return res.status(400).send("Please send all the details (title, publishYear, author)")
        }

        const newBook={title, author, publishYear}
        const book=await Book.create(newBook)
        res.status(201).send(book)

    }catch(error){
        console.log(error)
        res.status(500).send("Error message: " + error.message)
    }
})



export default router

