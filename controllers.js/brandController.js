const Brand = require('../models/brand');

//* Display list of all Brands
exports.brand_list = (req, res) => {
    res.send('Not implemented: brand list');
};

//* Display detail page for a specific Brand
exports.brand_detail = (req, res) => {
    res.send(`Not implemented: brand detail: ${req.params.id}`);
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