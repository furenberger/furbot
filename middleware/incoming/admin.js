/**
 * Created by ryanfurness on 4/8/17.
 */
const admin = {
    type: 'incoming',
    name: 'admin',
    controller: (bot, update, next) => {
        console.log('ADMIN incoming listener');
        //here we could attach tone, etc to the request
        next();
    }
};

module.exports = {
    admin
};