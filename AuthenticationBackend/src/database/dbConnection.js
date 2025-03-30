const mongoose = require("mongoose");
const HandleMongoDb = async (url) => {
    return await mongoose.connect(url);
}
module.exports = { HandleMongoDb };