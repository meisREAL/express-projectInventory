const Phone = require('../models/phone');
const Brand = require('../models/brand');
const Seller = require('../models/seller');
const Review = require('../models/review');
const async = require('async');
const { body, validationResult } = require("express-validator");



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
exports.phone_create_get = (req, res, next) => {
    async.parallel(
        {
            sellers(callback) {
                Seller.find(callback);
            },
            brands(callback) {
                Brand.find(callback);
            },
        },

        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render('phone_form', {
                title: 'Create Phone',
                sellers: results.sellers,
                brands: results.brands,
            });
        }
    );
};

//* Handle phone create on POST
exports.phone_create_post = [
    body('model', 'Model must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('brand', 'Brand must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Phone must have a description')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('seller', 'Seller must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const phone = new Phone({
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            seller: req.body.seller,
        });

        if (!errors.isEmpty()) {
            async.parallel(
                {
                    sellers(callback) {
                        Seller.find(callback);
                    },
                    brands(callback) {
                        Brand.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render({
                        title: 'Create Phone',
                        sellers: results.sellers,
                        brands: results.brands,
                        phone,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        phone.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(phone.url);
        });
    },
];

//* Display phone delete FORM on GET
exports.phone_delete_get = (req, res, next) => {
    async.parallel(
        {
            phone(callback) {
                Phone.findById(req.params.id).exec(callback);
            },
            phones_reviews(callback) {
                Review.find({ phone: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.phone == null) {
                res.redirect('/browse/phones');
            }
            res.render('phone_delete', {
                title: 'Delete Phone',
                phone: results.phone,
                phone_reviews: results.phones_reviews,
            });
        }
    );
};

//* Handle phone delete on POST
exports.phone_delete_post = (req, res, next) => {
    async.parallel(
        {
            phone(callback) {
                Phone.findById(req.body.phoneid).exec(callback);
            },
            phones_reviews(callback) {
                Review.find({ phone: req.body.phoneid }).exec(callback);
            },
        },

        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.phones_reviews > 0) {
                res.render('phone_delete', {
                    title: 'Delete Phone',
                    phone: results.phone,
                    phone_reviews: results.phones_reviews,
                });
                return;
            }
            Phone.findByIdAndRemove(req.body.phoneid, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/browse/phones')
            })
        }
    );
};

//* Display phone update on GET
exports.phone_update_get = (req, res, next) => {
    async.parallel(
        {
            phone(callback) {
                Phone.findById(req.params.id)
                    .populate('seller')
                    .populate('brand')
                    .exec(callback);
            },
            sellers(callback) {
                Seller.find(callback);
            },
            brands(callback) {
                Brand.find(callback);
            },
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
            res.render('phone_form', {
                title: 'Update Phone',
                sellers: results.sellers,
                brands: results.brands,
                phone: results.phone,
            });
        }
    );
};

//* Handle phone update on POST
exports.phone_update_post = [
    body('model', 'Model must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('brand', 'Brand must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Phone must have a description')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('seller', 'Seller must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const phone = new Phone({
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            seller: req.body.seller,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            async.parallel(
                {
                    brands(callback) {
                        Brand.find(callback);
                    },
                    seller(callback) {
                        Seller.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render('phone_form', {
                        title: 'Update Phone',
                        brands: results.brands,
                        sellers: results.sellers,
                        phone,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        Phone.findByIdAndUpdate(req.params.id, phone, {}, (err, thephone) => {
            if (err) {
                return next(err);
            }
            res.redirect(thephone.url)
        })
    }
];