import { app } from '../app.js';
import { iShop} from '../users/entities/shop-cart.entity';
import { iProduct} from '../users/entities/product.entity';
import { iUser} from '../users/entities/user.entity';
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
      
    }
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
    }
];

(async () => {
    const connect = await mongooseConnect();
    aUsers = Promise.all(aUsers.map((item) => ({
        ...item,
        passwd: BcryptService.prototype.encrypt(item.password, 10),
    }));)

  
    console.log(aUsers);
    const Users = User.insertMany(aUsers);
    console.log(User);
    const user1 = User.findOne({ name: 'Pepe' });

    const user2 = User.findOne({ name: 'Pepito' });

    console.log(Task);
})();
console.log('hola');
