/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';

const isEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

export interface iUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    address: string;
    payMethod: string;
    shopCart?: Types.ObjectId;
    wishList?: Types.ObjectId[];
}
export const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail, 'Provided email is not valid.'],
    },
    password: { type: String, minlength: 5, required: true },
    address: { type: String, minlength: 5 },
    payMethod: { type: String, minlength: 5 },
    shopCart: { type: SchemaTypes.ObjectId, ref: 'Shop' },
    wishList: [{ type: SchemaTypes.ObjectId, ref: 'Product' }],
});
