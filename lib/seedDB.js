const mongoose = require('mongoose');
const Order = require('../models/Order'); // Importar los modelos definidos en el código del contexto
const Item = require('../models/Item');
require('dotenv').config()
async function seedDatabase() {
    // Conectar con la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Crear algunos items de prueba
    const item1 = await Item.create({
        title: 'Item 1',
        description: 'Descripción del item 1',
        url: 'https://example.com/item1',
        price: 10,
    });
    const item2 = await Item.create({
        title: 'Item 2',
        description: 'Descripción del item 2',
        url: 'https://example.com/item2',
        price: 20,
    });

    const today = new Date(); // Crear un nuevo objeto Date con la fecha actual
    const twoDaysLater = new Date(today); // Crear una copia de la fecha actual
    twoDaysLater.setDate(today.getDate() + 2); // Sumar dos días a la fecha

    // Crear una orden de prueba con los items asociados
    const order = await Order.create({
        createDate: new Date(),
        status: 'Approve',
        client: 'Cliente de prueba',
        shippingAddress: 'Dirección de envío de prueba 1',
        shippingPromise: twoDaysLater,
        items: [item1._id, item2._id],
    });

    const order2 = await Order.create({
        createDate: new Date(),
        status: 'Approve',
        client: 'Cliente de prueba 2',
        shippingAddress: 'Dirección de envío de prueba 2',
        shippingPromise: twoDaysLater,
        items: [item1._id, item2._id],
    });

    const order3 = await Order.create({
        createDate: new Date(),
        status: 'Traveling',
        client: 'Cliente de prueba 2',
        shippingAddress: 'Dirección de envío de prueba 3',
        shippingPromise: twoDaysLater,
        items: [item1._id, item2._id],
    });

    const order4 = await Order.create({
        createDate: new Date(),
        status: 'Cancel',
        client: 'Cliente de prueba 4',
        shippingAddress: 'Dirección de envío de prueba 4',
        shippingPromise: new Date(),
        items: [item1._id],
    });

    const order5 = await Order.create({
        createDate: new Date(),
        status: 'Cancel',
        client: 'Cliente de prueba 5',
        shippingAddress: 'Dirección de envío de prueba 5',
        shippingPromise: new Date(),
        items: [item2._id],
    });
    const order6 = await Order.create({
        createDate: new Date(),
        status: 'Delivery',
        client: 'Cliente de prueba 6',
        shippingAddress: 'Dirección de envío de prueba 6',
        shippingPromise: twoDaysLater,
        items: [item1._id, item2._id],
    })

    console.log('Datos de prueba insertados correctamente');
}

seedDatabase();
