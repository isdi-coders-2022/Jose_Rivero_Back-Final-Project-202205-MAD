/*  import { app } from '../app.js';
import { iShop } from '../users/entities/shop-cart.entity';
import { iProduct } from '../users/entities/product.entity';
import { iUser } from '../users/entities/user.entity';
import { BcryptService } from '../auth/bcrypt.service';
import { mongooseConnect } from './mongoose.js';

let aUsers: Array<iUser> = [
    {
        name: 'Rodrigo',
        email: 'Rodrigo@isdi.com',
        password: 'password',
        address: 'En su casa',
        payMethod: 'paypal',
    },
    {
        name: 'Fernando',
        email: 'confidencial@isdi.com',
        password: 'confidencial',
        address: 'confidencial',
        payMethod: 'confidencial',
    },
];

const aTasks: Array<iProduct> = [
    {
        name: 'MANTA TEST',
        price: 10,
        onSale: false,
        category: 'Accessories',
        stock: 30,
        color: 'black',
        size: 'L',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    {
        name: 'LAPTO TEST',
        price: 10,
        onSale: false,
        category: 'Accessories',
        stock: 30,
        color: 'black',
        size: 'L',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    {
        name: 'CEPILLO TEST',
        price: 10,
        onSale: false,
        category: 'Accessories',
        stock: 30,
        color: 'black',
        size: 'L',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
];

export const initDB = async () => {
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            password: await BcryptService.prototype.encrypt(item.password),
        }))
    );
    const users = await insertMany(aUsers);
    aTasks[0].responsible = users[0].id;
    aTasks[1].responsible = users[1].id;
    const tasks = await Task.insertMany(aTasks);

    const finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { tasks: [tasks[i].id] },
            },
            // { ...item, tasks: [tasks[i].id] },
            { new: true }
        );
    }

    
    return {
        tasks,
        users: finalUsers,
    };
};

 */
