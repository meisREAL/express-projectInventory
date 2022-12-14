const Seller = require('../models/seller');
const Phone = require('../models/phone');
const async = require('async');
const { body, validationResult } = require('express-validator');


//* Display list of all sellers
exports.seller_list = (req, res, next) => {
    Seller.find()
        .sort([['name', 'ascending']])
        .exec((err, list_sellers) => {
            if (err) {
                return next(err);
            }
            res.render('seller_list', {
                title: 'Sellers that sell',
                seller_list: list_sellers,
            });
        })
}

//* Display detail of seller
exports.seller_detail = (req, res, next) => {
    async.parallel(
        {
            seller(callback) {
                Seller.findById(req.params.id).exec(callback);
            },
            seller_phones(callback) {
                Phone.find({ seller: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.seller == null) {
                const err = new Error('Seller not found');
                err.status = 404;
                return next(err);
            }
            res.render('seller_detail', {
                title: 'Seller details',
                seller: results.seller,
                seller_phones: results.seller_phones,
            });
        }
    );
};

//* Display Seller create on GET
exports.seller_create_get = (req, res, next) => {
    res.render('seller_form', { title: 'Create new Seller' })
};

//* Handle seller create on POST
exports.seller_create_post = [
    body('seller_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Seller name must be specified'),
    body('seller_address')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Address must be specified'),
    body('seller_info')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Info must be specified'),
    body('seller_site')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Website must be specified'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('seller_form', {
                title: 'Create Seller',
                seller: req.body,
                errors: errors.array(),
            });
            return;
        }

        const seller = new Seller({
            seller_name: req.body.seller_name,
            seller_address: req.body.seller_address,
            seller_info: req.body.seller_info,
            seller_site: req.body.seller_site,
        });

        seller.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(seller.url)
        })
    }
];

//* Display seller delete form on GET
exports.seller_delete_get = (req, res, next) => {
    async.parallel(
        {
            seller(callback) {
                Seller.findById(req.params.id).exec(callback);
            },
            sellers_phones(callback) {
                Phone.find({ seller: req.params.id }).exec(callback);
            },
        },

        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.seller == null) {
                res.redirect('/browse/sellers');
            }
            res.render('seller_delete', {
                title: 'Delete Seller',
                seller: results.seller,
                seller_phones: results.sellers_phones,
            });
        }
    );
};

//* Handle seller delete on POST
exports.seller_delete_post = (req, res, next) => {
    async.parallel(
        {
            seller(callback) {
                Seller.findById(req.body.sellerid).exec(callback);
            },
            sellers_phones(callback) {
                Phone.find({ seller: req.body.sellerid }).exec(callback);
            },
        },

        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.sellers_phones.length > 0) {
                //* If seller has phones, we cant delete hom, so we render same page as fo GET route
                res.render('seller_delete', {
                    title: 'Delete Seller',
                    seller: results.seller,
                    seller_books: results.sellers_phones,
                });
                return;
            }

            Seller.findByIdAndRemove(req.body.sellerid, (err) => {
                if (err) {
                    return next(err);
                }

                res.redirect('/browse/sellers');
            });
        }

    );
};

//* Display seller update form on GET
exports.seller_update_get = (req, res, next) => {
    Seller.findById(req.params.id, (err, seller) => {
        if (err) {
            return next(err);
        }
        if (seller == null) {
            const err = new Error('Seller not found');
            err.status = 404;
            return next(err);
        }
        res.render('seller_form', {
            title: 'Update Seller',
            seller: seller,
        });
    })
};

//* Handle seller update on POST
exports.seller_update_post = (req, res) => [
    body('seller_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Seller name must be specified'),
    body('seller_address')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Address must be specified'),
    body('seller_info')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Info must be specified'),
    body('seller_site')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Website must be specified'),

    (req, res, next) => {
        const errors = validationResult(req);

        const seller = new Seller({
            seller_name: req.body.seller_name,
            seller_address: req.body.seller_address,
            seller_info: req.body.seller_info,
            seller_site: req.body.seller_site,
        });

        if (!errors.isEmpty()) {
            res.render('seller_form', {
                title: 'Update Seller',
                seller: seller,
                errors: errors.array(),
            })
            return;
        }
        Seller.findByIdAndUpdate(
            req, params.id,
            seller,
            {},
            (err, theseller) => {
                if (err) {
                    return next(err);
                }
                res.redirect(theseller.url);
            }
        );
    }
];