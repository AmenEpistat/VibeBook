import { model, Schema } from 'mongoose';

const BookSchema = new Schema ({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: { type: String },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    description: { type: String },
});

export const Book = model('Book', BookSchema);
