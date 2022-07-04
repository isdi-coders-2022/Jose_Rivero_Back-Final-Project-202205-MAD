import { Schema, SchemaTypes, Types } from 'mongoose';

type categories = 'Tshirt' | 'Accessories';

export interface iProduct {
    id?: Types.ObjectId;
    name: string;
    price: number;
    onSale: boolean;
    category: categories;
    stock: number;
    size: string;
    image: string;
}

export const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, minlength: 2, required: true },
    onSale: { type: Boolean, default: false },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
});
