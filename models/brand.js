const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    brand_name: { type: String, required: true, maxLength: 100 },
    about_brand: { type: String, required: true, },
    headquarters: { type: String, required: true },
    year_founded: { type: String, required: true, maxLength: 100 }
});

// don't use arrow function as THIS object will be needed
BrandSchema.virtual('url').get(function () {
    return `/browse/brand/${this._id}`;
});

module.exports = mongoose.model('Brand', BrandSchema);