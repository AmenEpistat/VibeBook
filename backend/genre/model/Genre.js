import { model, Schema } from 'mongoose';

const GenreSchema = new Schema ({
  name: {type: String, unique: true, required: true},
});

export const Genre = model('Genre', GenreSchema);
