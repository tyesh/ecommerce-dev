import mongoose from 'mongoose';

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Genre',
      },
    ],
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

const Author = mongoose.model('Author', authorSchema);

export default Author;
