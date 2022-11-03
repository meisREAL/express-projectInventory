const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    model: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    description: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true }
});

PhoneSchema.virtual('url').get(function () {
    return `/browse/phone/${this._id}`;
});

module.exports = mongoose.model('Phone', PhoneSchema);