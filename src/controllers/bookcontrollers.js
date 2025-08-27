import bookData from "../models/booksModel.js";


export const postBooks = async (req, res) => {
  try {
    // The request body is expected to be an array of book data objects.
    const booksToInsert = req.body;
    
    // Check if the request body is an array and contains data
    if (!Array.isArray(booksToInsert) || booksToInsert.length === 0) {
      return res.status(400).send({ message: "Request body must be an array of books." });
    }

    // Insert all books from the request body into the database at once.
    // The insertMany method is much more efficient for bulk operations.
    const insertedBooks = await bookData.insertMany(booksToInsert);

    // Send a success response with the inserted books.
    res.status(201).send(insertedBooks);
  } catch (error) {
    // Catch validation or other database errors and send a 400 response.
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
