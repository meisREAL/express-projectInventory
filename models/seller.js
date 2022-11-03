const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    seller_name: { type: String, required: true, maxLength: 100 },
    seller_address: { type: String, required: true },
    seller_info: { type: String, required: true },
    seller_site: { type: String, required: true }
});

SellerSchema.virtual('url').get(function () {
    return `/browse/seller/${this._id}`;
});

module.exports = mongoose.model('Seller', SellerSchema);