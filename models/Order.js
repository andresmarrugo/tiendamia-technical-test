const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    createDate: Date,
    status: String,
    client: String,
    shippingAddress: String,
    shippingPromise: Date,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);