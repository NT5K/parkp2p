// var geocoder = require('geocoder');

// geocoder.geocode("Atlanta, GA", function (err, data) {
//     console.log(data)
// });

var geocoder = require('google-geocoder');

var geo = geocoder({
    key: 'AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
});


geo.find('12805 Shaker Blvd Cleveland Ohio 44120', function (err, res) {

    console.log(res)

});