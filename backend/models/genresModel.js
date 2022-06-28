import mongoose from 'mongoose';

const genreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model('Genre', genreSchema);

export default Genre;
