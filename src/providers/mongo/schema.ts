import mongoose, { Schema } from "mongoose";
import { IUserDb, UserRole } from "../../types";

mongoose.plugin((schema) => {
    schema.set('timestamps', true);
    schema.set('versionKey', false);
})

const schema = new Schema<IUserDb>({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: UserRole.USER },
})

const UserModel = mongoose.model<IUserDb>('User', schema, 'users');

export { UserModel };