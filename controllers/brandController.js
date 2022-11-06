const Brand = require('../models/brand');
const Phone = require('../models/phone');
const async = require('async');

//* Display list of all Brands
exports.brand_list = (req, res, next) => {
    Brand.find()
        .sort([['name', 'ascending']])
        .exec((err, list_brands) => {
            if (err) {
                return next(err);
            }
            res.render('brand_list', {
                title: 'Brands you can find',
                brand_list: list_brands,
            });
        })
};

//* Display detail page for a specific Brand
exports.brand_detail = (req, res, next) => {
    async.parallel(
        {
            brand(callback) {
                Brand.findById(req.params.id).exec(callback);
            },
            brand_phones(callback) {
                Phone.find({ brand: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.brand == null) {
                const err = new Error('Brand not found');
                err.status = 404;
                return next(err);
            }
            res.render('brand_detail', {
                title: 'Brand Details',
                brand: results.brand,
                brand_phones: results.brand_phones,
            });
        }
    );
};

//* Display brand create form on GET
exports.brand_create_get = (req, res) => {
    res.send('Not implemented: brand create GET');
};

//* Handle brand create on POST
exports.brand_create_post = (req, res) => {
    res.send('Not implemented: brand create post');
};

//* Display Brand delete on get
exports.brand_delete_get = (req, res) => {
    res.send('Not implemented: brand delete get')
}

//* Handle Brand delete on POST
exports.brand_delete_post = (req, res) => {
    res.send('Not implemented: brand delete post');
};

//* Display Brand update on GET
exports.brand_update_get = (req, res) => {
    res.send('Not implemented: brand update get');
};

//* Handle Brand update on POST
exports.brand_update_post = (req, res) => {
    res.send('Not implemented: brand update post');
};