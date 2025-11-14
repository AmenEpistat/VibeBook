import { model, Schema } from 'mongoose';

const AuthorSchema = new Schema ({
    name: {type: String, required: true},
    surname: {type: String, required: true},
});

export const Author = model('Author', AuthorSchema);
