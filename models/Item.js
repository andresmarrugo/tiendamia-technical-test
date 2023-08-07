const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    price: Number,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);
