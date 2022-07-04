import { Schema, SchemaTypes, Types } from 'mongoose';

const isEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

type shopProduct = { product: Types.ObjectId; quantity: number };

export interface iUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    address: string;
    payMethod: string;
    shopCart?: Array<shopProduct>;
    wishList?: Types.ObjectId[];
}
export const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Provided email is not valid.'],
        unique: true,
    },
    password: { type: String, minlength: 5 },
    address: { type: String, minlength: 5 },
    payMethod: { type: String, minlength: 5 },
    shopCart: [
        {
            product: { type: SchemaTypes.ObjectId, ref: 'Product' },
            quantity: Number,
        },
    ],
    wishList: [{ type: SchemaTypes.ObjectId, ref: 'Product' }],
});
