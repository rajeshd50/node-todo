'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let TodoSchema = new Schema({
	text: {
		type: String,
		trim: true,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	expiary: {
		type: Date
	},
	completed: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Todo', TodoSchema);
