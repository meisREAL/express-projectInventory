const Brand = require('../models/brand');
const Phone = require('../models/phone');
const async = require('async');
const { body, validationResult } = require('express-validator');

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
exports.brand_create_get = (req, res, next) => {
    res.render('brand_form', { title: 'Create new Brand' });
};

//* Handle brand create on POST
exports.brand_create_post = [
    body('brand_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Brand name must be specified'),
    body('about_brand')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Information must be specified'),
    body('headquarters')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Headquarters must be specified'),
    body('year_founded')
        .trim()
        .isLength({ min: 4 })
        .escape()
        .withMessage('Year must be specified'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('brand_form', {
                title: 'Create new Brand',
                brand: req.body,
                errors: errors.array(),
            });
            return;
        }

        const brand = new Brand({
            brand_name: req.body.brand_name,
            about_brand: req.body.about_brand,
            headquarters: req.body.headquarters,
            year_founded: req.body.year_founded,
        });

        brand.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(brand.url)
        })
    }

];

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