/**
 * Created by ryanfurness on 4/8/17.
 */
const replyToUser = {
    type: 'incoming',
    name: 'reply-to-user',
    controller: (bot, update, next) => {
        if (update.text === 'hi' ||
            update.text === 'Hi' ||
            update.text === 'hello' ||
            update.text === 'Hello') {
            return bot.reply(update, 'Hello World');
        }else{
            //text does not match
            next();
        }
    }
};

module.exports = {
    replyToUser, // using shorthand here
};