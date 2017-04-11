/**
 * Created by ryanfurness on 4/8/17.
 */
const Promise = require('bluebird');
const request = require('request');

const weather = {
    type: 'incoming',
    name: 'weather',
    controller: (bot, update, next) => {
        if (update.text === 'weather') {

            return new Promise(function(resolve, reject) {
                let weather_url = 'http://api.wunderground.com/api/' + process.env.WEATHER_API + '/conditions/q/53005.json';

                request({
                        method: 'get',
                        url: weather_url
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            const weather = JSON.parse(body);
                            const reply = `The weather for ${weather.current_observation.display_location.full} 
                                            is ${weather.current_observation.weather} 
                                            with temperature ${weather.current_observation.feelslike_string}`;
                            resolve(reply);
                        }else{
                            reject(error);
                        }
                    });
            })
                .then(function(response){
                    return bot.reply(update, response);
                })
                .error(function(error){
                    return bot.reply(update, "no weather at this time: ", error);

                })
        }else{
            //text does not match
            next();
        }
    }
};

module.exports = {
    weather
};