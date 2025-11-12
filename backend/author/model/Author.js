import { model, Schema } from 'mongoose';

const AuthorSchema = new Schema ({
  name: {type: String, unique: true, required: true},
});

export const Author = model('Author', AuthorSchema);
