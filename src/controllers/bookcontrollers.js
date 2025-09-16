import bookData from "../models/booksModel.js";


export const postBooks = async (req, res) => {
  try {
    const booksToInsert = req.body;
    if (!booksToInsert || Array.isArray(booksToInsert)) {
      return res.status(400).send({ message: "Request body must be an array of books." });
    }
    const insertedBooks = await bookData.create(booksToInsert);

    res.status(201).json({
        message: "successful uploaded",
        insertedBooks
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBooks = async (req, res) => {
    try{
        const books = await bookData.find();
        if(books.length === 0) {
            return res.status(404).send({ message: "No books found." });
        }
        res.status(200).json({
            message: "Books retrieved successfully.",
            data: books
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getBooksDetailsIndividual = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookData.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found." });
        }
        res.status(200).json({
            message: "Book retrieved successfully.",
            data: book
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateBooks = async (req, res) => {
   try{
      const bookupdateData = req.body

      if(!bookupdateData.BookName || !bookupdateData.imageUrl){
        res.status(401).json({
            message: "Invalid data"
        })
      }

      const newData = await bookData.updateOne(
        { BookName: bookupdateData.BookName},
        { $set: { imageUrl: bookupdateData.imageUrl}}
      )

      res.status(201).json({
        message: "Successful updated",
        newData
      })
   }
   catch(error){
     res.status(500).json({
        message: error.message
     })
   }
}

export const deleteData = async (req, res) => {
  try{
    const { id } = req.params;
  
  const newUser = await bookData.findByIdAndDelete(id)

  if (!newUser) {
      return res.status(404).json({ message: "No document found with that ID" });
    }

   res.status(200).json({message: "deleted Successful"})
  }
  catch(e){
     res.status(500).json({
      message: e.message
     })
  }
  


}