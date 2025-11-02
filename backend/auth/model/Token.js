import { model, Schema } from 'mongoose';

const TokenSchema = new Schema ({
	refreshToken : { type: String, required: true },
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const Token = model('Token', TokenSchema);
