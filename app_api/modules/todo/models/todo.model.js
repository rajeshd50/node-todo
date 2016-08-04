'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec;

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
	},
	file: {
		path: {
			type: String,
			trim: true
		},
		uuid: {
			type: String,
			trim: true
		},
		type: {
			type: String,
			trim: true	
		}
	}
});

TodoSchema.pre('save',function(next) {
	let doc = this;

	if(doc.file && doc.file.path) {
		let oldPath = path.join(__dirname,'../../../../',doc.file.path),
			extArr = doc.file.path.split('.'),
			ext = extArr[extArr.length-1],
			newName = ('_file'+doc._id+'.'+ext),
			newPath = path.join(__dirname,'../../../../uploads/',newName);
		fs.rename(oldPath,newPath,(err)=>{
			fs.rmdir(path.join(__dirname,'../../../../uploads/',doc.file.uuid,doc.file.type),(error)=> {
    			fs.rmdir(path.join(__dirname,'../../../../uploads/',doc.file.uuid),(error)=> {
	    			doc.file.path = newName;
	    			next();
	    		});	
    		});
		});
	} else {
		next();
	}
});

TodoSchema.post('remove',(doc)=> {
    if(doc.file) {
    	fs.unlink(path.join(__dirname,'../../../../uploads/',doc.file.path),(err)=> {
    		console.log('error remove',err);
    	});
    }
});

mongoose.model('Todo', TodoSchema);
