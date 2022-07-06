/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';

type shopProduct = { product: string; quantity: number };

export interface iShop {
    id?: Types.ObjectId;
    products?: Array<shopProduct>;
    owner: Types.ObjectId;
}
export const shopSchema = new Schema({
    products: {
        type: [
            {
                product: { type: SchemaTypes.ObjectId, ref: 'Product' },
                quantity: Number,
            },
        ],
        default: [],
    },
    owner: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
});
