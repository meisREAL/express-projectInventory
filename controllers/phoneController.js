const Phone = require('../models/phone');
const Brand = require('../models/brand');
const Seller = require('../models/seller');
const Review = require('../models/review');
const async = require('async');

//* This will be main page (home-page)
exports.index = (req, res) => {
    async.parallel(
        {
            phone_count(callback) {
                Phone.countDocuments({}, callback);
            },
            brand_count(callback) {
                Brand.countDocuments({}, callback);
            },
            seller_count(callback) {
                Seller.countDocuments({}, callback);
            },
            review_count(callback) {
                Review.countDocuments({}, callback);
            }
        },
        (err, results) => {
            res.render('index', {
                title: 'GSM sellout Home Page',
                error: err,
                data: results,
            })
        }
    );
};

//* Display list of all phones
exports.phone_list = (req, res, next) => {
    Phone.find({}, 'model brand')
        .sort({ model: 1 })
        .populate('brand')
        .exec((err, list_phones) => {
            if (err) {
                return next(err);
            }
            res.render('phone_list', {
                title: 'Phones in stock',
                phone_list: list_phones,
            });
        });
};

//* Display detail page for a phone
exports.phone_detail = (req, res, next) => {
    async.parallel(
        {
            phone(callback) {
                Phone.findById(req.params.id)
                    .populate('brand')
                    .populate('seller')
                    .exec(callback)
            },
            phone_reviews(callback) {
                Review.find({ phone: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.phone == null) {
                const err = new Error('Phone not found');
                err.status = 404;
                return next(err);
            }
            res.render('phone_detail', {
                title: results.phone.model,
                phone: results.phone,
                phone_reviews: results.phone_reviews,
            })
        }
    );
}

//* Display phone create on GET
exports.phone_create_get = (req, res) => {
    res.send('Not implemented: phone create get');
};

//* Handle phone create on POST
exports.phone_create_post = (req, res) => {
    res.send('Not implemented: phone create post');
};

//* Display phone delete FORM on GET
exports.phone_delete_get = (req, res) => {
    res.send('Not implemented: phone delete get');
};

//* Handle phone delete on POST
exports.phone_delete_post = (req, res) => {
    res.send('Not implemented: phone delete post');
};

//* Display phone update on GET
exports.phone_update_get = (req, res) => {
    res.send('Not implemented: phone update get');
};

//* Handle phone update on POST
exports.phone_update_post = (req, res) => {
    res.send('Not implemented: phone update post');
};