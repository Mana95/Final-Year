const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    id: {
        type: String,
        required: true
    },
    type: {

        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
       required:true
    },
    active:{
        type:Boolean
    }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('scheduletype', schema);