import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  slug: String,
  img: String,
});

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [movieSchema],
});

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collections: [collectionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Favorite", favoriteSchema);
