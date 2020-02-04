var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var newSchema = new Schema({
    title: {type: String, required: [true,  'The title is necesary']},
    description: {type: String, required: [true,' The description is necesary']},
    createDate: {type: String, required: [true,  'The createDate is necesary']},
    content: {type: String, required: [true,  'The content is necesary']},
    author: {type: String, required: [true, ' The author is necesary']},
    archiveDate: {type: String, required: false},
    archived: { type: Boolean,required: false}
});

// newSchema.plugin( uniqueValidator, { menssage: '{PATH} debe de ser único'});

module.exports = mongoose.model('News', newSchema);
