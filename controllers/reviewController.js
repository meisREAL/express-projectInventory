const Review = require('../models/review');

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
exports.review_detail = (req, res) => {
    res.send('Not implemented: review detail');
};

//* Display review create form on get
exports.review_create_get = (req, res) => {
    res.send('Not implemented: review create get');
};

//* Handle review create post
exports.review_create_post = (req, res) => {
    res.send('Not implemented: review create post');
};

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