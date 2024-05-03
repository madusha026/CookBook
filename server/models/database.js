const mongoose = require('mongoose');
/*module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};
*/
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('connected')
});

//models
require('./Category');
require('./Recipe');