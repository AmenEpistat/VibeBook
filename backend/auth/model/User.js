import { model, Schema } from 'mongoose';

const UserSchema = new Schema ({
	email : { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activatedLink: { type: String },
  roles: [{ type: String, ref: 'Role', default: ['USER'] }]
});

export const User = model('User', UserSchema);
