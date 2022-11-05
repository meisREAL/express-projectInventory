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
exports.phone_list = (req, res) => {
    res.send('Not implemented: phone list');
};

//* Display detail page for a phone
exports.phone_detail = (req, res) => {
    res.send(`Not implemented: phone detail ${req.params.id}`);
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