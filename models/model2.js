
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new mongoose.Schema({
	articleId: {
		type: String
	},
	comment: {
		type: String
	},
	createdAt: {
		type: Date, 
		default: Date.now
	}
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;