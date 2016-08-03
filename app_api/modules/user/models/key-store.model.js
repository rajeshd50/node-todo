'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let KeyStoreSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	token: {
		type: String,
		required: true
	},
	expiary: {
		type: Date,
        required: true
	}
});


mongoose.model('KeyStore', KeyStoreSchema);
