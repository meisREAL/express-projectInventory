const Review = require('../models/review');
const Phone = require('../models/phone');
const { body, validationResult } = require("express-validator");


//* Display list of all reviews
exports.review_list = (req, res, next) => {
    Review.find()
        .populate('phone')
        .exec((err, list_reviews) => {
            if (err) {
                return next(err);
            }
            res.render('review_list', {
                title: 'Our Reviews!',
                review_list: list_reviews,
            })
        })
};

//* Display detail page for a review
exports.review_detail = (req, res, next) => {
    Review.findById(req.params.id)
        .populate('phone')
        .exec((err, review) => {
            if (err) {
                return next(err);
            }
            if (review = null) {
                const err = new Error('Review not found');
                err.status = 404;
                return next(err)
            }
            res.render('review_detail', {
                title: 'Review',
                review,
            })
        });
};

//* Display review create form on get
exports.review_create_get = (req, res, next) => {
    Phone.find({}, 'model').exec((err, phones) => {
        if (err) {
            return next(err);
        }
        res.render('review_form', {
            title: 'Create Review',
            phone_list: phones,
        });
    });
};

//* Handle review create post
exports.review_create_post = [
    body('phone', 'Phone must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('review_summary', 'Review must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('reviewer', 'Reviewer must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const review = new Review({
            phone: req.body.phone,
            review_summary: req.body.review_summary,
            reviewer: req.body.reviewer,
        });

        if (!errors.isEmpty()) {
            Phone.find({}, 'model').exec(function (err, phones) {
                if (err) {
                    return next(err);
                }
                res.render({
                    title: 'Create Review',
                    phone_list: phones,
                    selected_phone: review.phone._id,
                    errors: errors.array(),
                    review,
                });
            });
            return;
        }
        review.save((err) => {
            if (err) {
                return (err);
            }
            res.redirect(review.url);
        });
    },
];

//* Display review delete on get
exports.review_delete_get = (req, res) => {
    res.send('Not implemented: review delete get');
};

//* Handle review delete on POST
exports.review_delete_post = (req, res) => {
    res.send('Not implemented: review delete post');
};

//* Display review update form on GET
exports.review_update_get = (req, res) => {
    res.send('Not implemented: review update get');
};

//* Handle review update on POST
exports.review_update_post = (req, res) => {
    res.send('Not implemented: review update post');
};