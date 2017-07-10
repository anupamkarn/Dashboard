var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampusSchema = new Schema({
	name: String

}, {
	collection: 'campus'
});

var VisitorSchema = new Schema({
	campusId: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'campus'
	}

}, {
	collection: 'visitorrecords'
});

var Users = new Schema({
	campusId: {
		type:mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'campus'
	},
	_id:{
		type: mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'userinapp'
	}

}, {
	collection: 'users'
});

var Employee = new Schema({
	campusId: {
		type:mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'campus'
	},
	_id:{
		type: mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'attendance'
	},

}, {
	collection: 'employees'
});

var Attendance = new Schema({
	employeeId:{
		type: mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'employees'
	},
	campusId: {
		type:mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'campus'
	}
},{
	collection: 'attendances'
});

var Usersinapp = new Schema({
	userId: {
		type:mongoose.Schema.Types.ObjectId,
		require:true,
		ref:'user'
	}

}, {
	collection: 'deviceinformations'
});
/*var model = mongoose.model('model', CampusSchema);
*/
/*function getcampuslist () {
	res.render('campuslist', {
		
	})
}*/
/*
module.exports.getcampuslist = getcampuslist;*/
module.exports = {
	campus: mongoose.model('campus', CampusSchema),
	visitor: mongoose.model('visitor', VisitorSchema),
	user: mongoose.model('user', Users),
	employee: mongoose.model('employee', Employee),
	attendance: mongoose.model('attendance', Attendance),
	userinapp: mongoose.model('userinapp', Usersinapp)	
};
/*module.exports = mongoose.model('visitor', VisitorSchema);*/