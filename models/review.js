const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    phone: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
    review_summary: { type: String, required: true },
    reviewer: { type: String, required: true, maxLength: 100 }
});

ReviewSchema.virtual('url').get(function () {
    return `/browse/review/${this._id}`;
});

module.exports = mongoose.model('Review', ReviewSchema);