import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  BookName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  BookAuthor: { type: String, required: true },
  Rating: { type: Number, required: true },
  Status: {
    type: String,
    enum: ["Love", "Horror", "Psychology", "Rich"],
    default: "All",
  },
  Description: { type: String, required: true },
  PublishedDate: { type: Date, required: true },
  CompanyRights: { type: String, required: true },
});

const bookData = mongoose.model("Book", bookSchema);
export default bookData;
