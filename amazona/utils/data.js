import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/shirt1.jpg?raw=true`,
            price: 70,
            brand: 'Niky',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description:  'A free shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/shirt2.jpg?raw=true`,
            price: 80,
            brand: 'Ardidas',
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description:  'A fit shirt',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/pants3.jpg?raw=true`,
            price: 90,
            brand: 'Raimundo',
            rating: 4.5,
            numReviews: 3,
            countInStock: 20,
            description:  'A slim shirt',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/pants1.jpg?raw=true`,
            price: 90,
            brand: 'Olivas',
            rating: 2.9,
            numReviews: 13,
            countInStock: 20,
            description:  'A golf pants',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/pants2.jpg?raw=true`,
            price: 95,
            brand: 'Zarai',
            rating: 3.5,
            numReviews: 7,
            countInStock: 20,
            description:  'A fit pants',
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: `https://github.com/HermesZum/Next-Tailwind-eCommerce-2022/blob/master/amazona/public/images/pants3.jpg?raw=true`,
            price: 75,
            brand: 'Porscha',
            rating: 2.4,
            numReviews: 14,
            countInStock: 20,
            description:  'A classic pants',
        },
    ]
}

export default data;