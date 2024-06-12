const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// -name
// -email
// -password
// -contact
// -address
const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Company = mongoose.model('Comapny', companySchema);

module.exports = Company;