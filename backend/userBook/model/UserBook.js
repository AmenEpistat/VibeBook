import { Schema, model } from 'mongoose';

const UserBookSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
        book_id: { type: Schema.Types.ObjectId, ref: 'Book', required: true, },
        status: { type: String, enum: ['READING', 'COMPLETED', 'PROCESS'], },
        isQueue: { type: Boolean, default: false },
        isFavorite: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

UserBookSchema.index({ user_id: 1, book_id: 1 }, { unique: true });

export const UserBook = model('UserBook', UserBookSchema);
