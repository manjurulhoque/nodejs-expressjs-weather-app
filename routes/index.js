const request = require('request');


function getWeather(location, callback) {
    var encodedAddress = encodeURIComponent(location);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error)
        {
            console.log('Unable to connect with googleapis');
        }
        else if (body.status == 'ZERO_RESULTS') {
            // console.log('Google can\'t find this address');
            callback('Google can\'t find this address', undefined);
        }
        else if(body.status == 'OK'){
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Lattitude: ${body.results[0].geometry.location.lat}`);
            // console.log(JSON.stringify(response, undefined, 4));
            request({
                url: `https://api.darksky.net/forecast/YOUR_API/${body.results[0].geometry.location.lat},${body.results[0].geometry.location.lng}`,
                json: true
            }, (error, response, body) => {
                // console.log(JSON.stringify(response, undefined, 4));
                // console.log(response.body.currently.temperature);
                callback(error, body);
            });
        }
    });
}

//home
exports.home = function(req, res) {
    if(req.method.toLowerCase() == 'get'){
        res.render('home', {
            title : "Simple Node js weather app",
        });
    }
    else if(req.method.toLowerCase() == 'post'){
        var location = req.body.location;

        var d = new Date(1501236000 * );

        getWeather(location, function(error, result){
            if(error)
            {
                console.log('wrong');
                res.render('location', {
                    title : "Simple Node js weather app",
                    error : 'Something wrong',
                    result: null,
                    location: location
                });
            }
            else {
                console.log(result);
                res.render('location', {
                    title : "Simple Node js weather app",
                    error : null,
                    result : result,
                    location: location,
                    d: d
                });
            }
        });
    }
};

exports.location = function(req, res) {
    var location = req.query.location;

    res.render('location', {
        title : "Simple Node js weather app",
        location : location,
    });
};

// not found
exports.not_found =  function(req, res){
  res.send('This page is not available');
};
