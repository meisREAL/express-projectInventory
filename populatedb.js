#! /usr/bin/env node

console.log('This script populates your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Phone = require('./models/phone')
var Brand = require('./models/brand')
var Seller = require('./models/seller')
var Review = require('./models/review')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var phones = []
var brands = []
var sellers = []
var reviews = []

function brandCreate(brand_name, about_brand, headquarters, year_founded, cb) {
    branddetail = { brand_name: brand_name, about_brand: about_brand, headquarters: headquarters, year_founded: year_founded }

    var brand = new Brand(branddetail);

    brand.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Brand: ' + brand);
        brands.push(brand)
        cb(null, brand)
    });
}

function sellerCreate(seller_name, seller_address, seller_info, seller_site, cb) {
    var seller = new Seller({
        seller_name: seller_name,
        seller_address: seller_address,
        seller_info: seller_info,
        seller_site: seller_site
    });

    seller.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Seller: ' + seller);
        sellers.push(seller)
        cb(null, seller);
    });
}

function phoneCreate(model, brand, description, seller, cb) {
    phonedetail = {
        model: model,
        brand: brand,
        description: description,
        seller: seller
    };

    var phone = new Phone(phonedetail);
    phone.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Phone: ' + phone);
        phones.push(phone)
        cb(null, phone)
    });
}


function reviewCreate(phone, review_summary, reviewer, cb) {
    reviewdetail = {
        phone: phone,
        review_summary: review_summary,
        reviewer: reviewer
    }

    var review = new Review(reviewdetail);
    review.save(function (err) {
        if (err) {
            console.log('ERROR CREATING review: ' + review);
            cb(err, null)
            return
        }
        console.log('New review: ' + review);
        reviews.push(review)
        cb(null, review)
    });
}


function createSellerBrand(cb) {
    async.series([
        function (callback) {
            brandCreate('Pear', 'Lorem ipsum stuff that makes sense', 'somewhere in USA, but its a secret', '1996-12-12', callback);
        },
        function (callback) {
            brandCreate('Gnusmas', 'It was a bit of a reverse choice', 'North Korea', '1979-01-14', callback);
        },
        function (callback) {
            brandCreate('3310', 'Finnish multinational telecommunications, information technology, and consumer electronics corporation', 'Tampere, Peru', '1865-05-12', callback);
        },
        function (callback) {
            brandCreate('That cheap knock-off', 'Chinese designer and manufacturer of consumer electronics and related software, home appliances, and household items.', 'Taiwan', '2010-04-06', callback);
        },
        function (callback) {
            brandCreate('TwoMinus', 'They might be Chinese consumer electronics manufacturer', 'Shenzhen, China', '2013-12-16', callback);
        },
        function (callback) {
            sellerCreate('2Tele', 'Around next corner', 'Swedish telecommunications operator headquartered in the Kista Science City, Stockholm, Sweden. It is a major telephone operator in Sweden, Russia, Estonia, Latvia and Lithuania. They also sell stuff', 'www.realwebsite.tele', callback);
        },
        function (callback) {
            sellerCreate('Buy CHEAP phones', 's-street, c-city in country', 'Well know for selling stuff for really cheap prices. Dont ask how this is possible', 'www.cheapphones.buy', callback);
        },
        function (callback) {
            sellerCreate('French Poetry', ' 61 boulevard Aristide Briand, Le Bouscat', 'Guillotine. Rester camembert carrément manger fromage peu parce que grève guillotine évidemment bière on comme même nous du coup à la.', 'www.wesurrender.fr', callback);
        },
    ],
        // optional callback
        cb);
}


function createPhones(cb) {
    async.parallel([
        function (callback) {
            phoneCreate('Sleek Slime x14 core', brands[0], 'Brand new that looks same like 10 last models, but has some cool features that you will barely use or even need. But still a good expensive choice fro bragging rights', sellers[1], callback);
        },
        function (callback) {
            phoneCreate('14586kj6', brands[1], 'Powerful. Productive. Big, immersive display. Our toughest foldable yet, Nightography camera. UNFOLD YOUR WORLD. This is a real product description', sellers[2], callback);
        },
        function (callback) {
            phoneCreate('Universe B22+ EF G5', brands[1], 'We took what you love most and built the ultimate fan-inspired phone so you can experience your everyday passions to the absolute fullest. Our slowest and most expensive. The crowd goes wild', sellers[2], callback);
        },
        function (callback) {
            phoneCreate('G20', brands[2], 'Grab life, live it to the full, and share it with those who matter most. 3310 G20 makes that last bit easier. With its 48MP quad camera, powerful AI imaging modes, and OZO Audio, its never been easier to capture everything you see and hear. Its all powered by a long-lasting battery.', sellers[0], callback);
        },
        function (callback) {
            phoneCreate('im 22', brands[3], 'Strong flagship smartphone with limitations', sellers[0], callback);
        },
        function (callback) {
            phoneCreate('g5 T2 Dron', brands[4], 'More not so humble chipset brags. All hail the light vacuum', sellers[1], callback);
        },
        function (callback) {
            phoneCreate('MAX PRO 14', brands[0], 'A magical new way to interact with pPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail. All powered by the ultimate smartphone chip.', sellers[0], callback)
        }
    ],
        // optional callback
        cb);
}


function createReviews(cb) {
    async.parallel([
        function (callback) {
            reviewCreate(phones[0], ' It is so weird I love it.', 'Frankie', callback)
        },
        function (callback) {
            reviewCreate(phones[1], ' Best decision after buying a dog', 'Cat person', callback)
        },
        function (callback) {
            reviewCreate(phones[2], ' Its a meh for me. But they have tried', 'reviewer12345', callback)
        },
        function (callback) {
            reviewCreate(phones[3], ' My husband has never allowed me to write, as he doesnt want me touching mens pens. However when I saw this product, I decided to buy it (using my pocket money) and so far it has been fabulous! Once I had learnt to write, the feminine colour and the grip size (which was more suited to my delicate little hands) has enabled me to vent thoughts about new recipe ideas, sewing and gardening. My husband is less pleased with this product as he believes it will lead to more independence and he hates the feminine tingling sensation (along with the visions of fairies and rainbows) he gets whenever he picks it up.', 'A keen skier', callback)
        },
        function (callback) {
            reviewCreate(phones[3], ' PROS: Never dropped a call. CONS: It is not big enough. None of the buttons work', 'That one guy', callback)
        },
        function (callback) {
            reviewCreate(phones[3], 'Got this for the Mother in-law for bath time, hoping itd be crap, her phone would slip out and electrocute her. So far, this bloody thing is staying in one piece. Great for waterproof phone use, crap for murder.', 'Ben Harrison', callback)
        },
        function (callback) {
            reviewCreate(phones[4], ' Congratulations. You earned one star. Additional stars can be purchased for $5.49 each.', 'Customer', callback)
        },
        function (callback) {
            reviewCreate(phones[4], 'I dont know if this is a scam or if mine was broken, but it doesnt work and I am still getting abducted by UFOs on a regular basis.', 'Cyphis', callback)
        },
    ],
        // Optional callback
        cb);
}



async.series([
    createSellerBrand,
    createPhones,
    createReviews
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('REVIEWS: ' + reviews);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
