const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const funFactsSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    funfact: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('FunFact', funFactsSchema);