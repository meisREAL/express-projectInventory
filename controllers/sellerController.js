const Seller = require('../models/seller');

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
exports.seller_detail = (req, res) => {
    res.send(`Not implemented: seller detail ${req.params.id}`);
};

//* Display Seller create on GET
exports.seller_create_get = (req, res) => {
    res.send('Not implemented: seller create get');
};

//* Handle seller create on POST
exports.seller_create_post = (req, res) => {
    res.send('Not implemented: seller create post');
};

//* Display seller delete form on GET
exports.seller_delete_get = (req, res) => {
    res.send('Not implemented: seller delete get');
};

//* Handle seller delete on POST
exports.seller_delete_post = (req, res) => {
    res.send('Not implemented: seller delete post');
};

//* Display seller update form on GET
exports.seller_update_get = (req, res) => {
    res.send('Not implemented: seller update get');
};

//* Handle seller update on POST
exports.seller_update_post = (req, res) => {
    res.send('Not implemented: seller update post');
};