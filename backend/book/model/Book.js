import { model, Schema } from 'mongoose';

const BookSchema = new Schema ({
    author_id: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: { type: String },
    genres_id: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    description: { type: String, required: true },
    year_publication: { type: Date, required: true },
    cover: { type: String, unique: true },
});

export const Book = model('Book', BookSchema);
