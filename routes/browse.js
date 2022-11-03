const express = require('express');
const router = express.Router();
//* Require controller models
const brand_controller = require('../controllers/brandController');
const phone_controller = require('../controllers/phoneController');
const review_controller = require('../controllers/reviewController');
const seller_controller = require('../controllers/sellerController');

//! PHONE ROUTES//

//* GET browse home page
router.get('/', phone_controller.index);

//* GET request for creating a phone. NOTE: this must come before routes that display PHONE (uses id).
router.get('/phone/create', phone_controller.phone_create_get);

//* POST request for creating PHONE
router.post('/phone/create', phone_controller.phone_create_post);

//* GET request to delete phone
router.get('/phone/:id/delete', phone_controller.phone_delete_get);

//* POST request to delete phone
router.post('/phone/:id/delete', phone_controller.phone_delete_post);

//* GET request to update phone
router.get('/phone/:id/update', phone_controller.phone_update_get);

//* POST request to update phone
router.post('/phone/:id/update', phone_controller.phone_update_post);

//* GET request for one phone
router.get('/phone/:id', phone_controller.phone_detail);

//* GET request for list of all phone items
router.get('/phone', phone_controller.phone_list);

//! BRAND ROUTES //

//* GET request for creating BRAND. THIS MUST COME BEFORE ROUTE FOR ID
router.get('/brand/create', brand_controller.brand_create_get);

//* POST request for creating brand
router.post('/brand/create', brand_controller.brand_create_post);

//* GET request to delete brand
router.get('/brand/:id/delete', brand_controller.brand_delete_get);

//* POST request to delete brand
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

//* GET request to update brand
router.get('/brand/:id/update', brand_controller.brand_update_get);

//* POST request to update brand
router.post('/brand/:id/update', brand_controller.brand_update_post);

//* GET request for single brand
router.get('/brand/:id', brand_controller.brand_detail);

//* GET request for list of brands
router.get('/brands', brand_controller.brand_list);

//! REVIEW ROUTES //

//* GET request to create review
router.get('/review/create', review_controller.review_create_get);

//* POST request to create review
router.post('/review/create', review_controller.review_create_post);

//* GET request to delete review
router.get('/review/:id/delete', review_controller.review_delete_get);

//* POST request to delete review
router.post('/review/:id/delete', review_controller.review_delete_post);

//* GET request to update review
router.get('/review/:id/update', review_controller.review_update_get);

//* POST request to update review
router.post('/review/:id/update', review_controller.review_update_post);

//* GET request for a single review
router.get('/review/:id', review_controller.review_detail);

//* GET request for a list of reviews
router.get('/reviews', review_controller.review_list);

//! SELLER ROUTES //

//* GET request to create seller
router.get('/seller/create', seller_controller.seller_create_get);

//* POST request to create seller
router.post('/seller/create', seller_controller.seller_create_post);

//* GET request to delete seller
router.get('/seller/:id/delete', seller_controller.seller_delete_get);

//* POST request to delete seller
router.post('/seller/:id/delete', seller_controller.seller_delete_post);

//* GET request to update seller
router.get('/seller/:id/update', seller_controller.seller_update_get);

//* POST request to update seller
router.post('/seller/:id/update', seller_controller.seller_update_post);

//* GET request for a single seller
router.get('/seller/:id', seller_controller.seller_detail);

//* GET request for list of sellers
router.get('/sellers', seller_controller.seller_list);

module.exports = router;