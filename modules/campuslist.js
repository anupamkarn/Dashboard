
var jwt = require('jsonwebtoken');
var supersecret = 'alliswell';
var index = require('./login');
var campus = require('./usercampus').campus;
var visitor = require('./usercampus').visitor;
var user = require('./usercampus').user;
var employee = require('./usercampus').employee;
var attendance = require('./usercampus').attendance;
var userinapp = require('./usercampus').userinapp;
var _ = require('lodash');

function validtoken (req, res, next){

	var token = req.body.token || req.param(token) || req.headers['x-access-token'];

	// res.render(__dirname + '/../view/campuslist.ejs');

	if(token){
			/*console.log(token);	*/
		jwt.verify(token, supersecret, function(err, decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message:'Failed to authenticate token',
				});
			}
			else{
				req.decoded = decoded;
				/*console.log('rendering');*/
				var visitorSMR = 1;
				var visitorMantri = 1;
				
				var promise = campus.find().exec();
				promise.then(function(campuses){
					/*var promises1 = [];
					var promises2 = [];*/
					var allPromises = [];
					// console.log(campuses);
					_.forEach(campuses, (campus) => {
						/*promises1.push(visitor.count({campusId: campus._id}));*/
						allPromises.push(visitor.count({campusId: campus._id}));
					});

					_.forEach(campuses, (campus) => {
						/*promises2.push(user.count({'ownership.campusId': campus._id}));*/	
						allPromises.push(user.count({'ownership.campusId': campus._id}));	
					});

					_.forEach(campuses, (campus) => {
						allPromises.push(employee.count({campusId : campus._id}));
					});

					_.forEach(campuses, (campus) => {
						allPromises.push(userinapp.find({}).populate({path: 'userId', 

						model: 'user', select: 'ownership.campusId', 
						match: {'ownership.campusId': campus._id}})
						);
					});

					_.forEach(campuses, (campus) => {
						allPromises.push(attendance.find({}).populate({path: 
							'employeeId', model: 'employee', select: 'campusId', 
							match: {campusId: campus._id}})
						);
					});

					
					Promise.all(allPromises).then((results) => {
						/*console.log(results);*/
						var visitorCounts = _.slice(results, 0, campuses.length);
						var userCounts = _.slice(results, campuses.length, 2*campuses.length /*results.length*/);
						var employeeCount = _.slice(results, 2*campuses.length, 3*campuses.length);
						var usersinapp = _.slice(results, 3*campuses.length, 4*campuses.length);
						var employeeAttendance = _.slice(results, 4*campuses.length, 5*campuses.length);
						/*var campusNames = _.slice(results, 5*campuses.length, results.length);*/
						/*console.log(visitorCounts);
						console.log(userCounts);
						console.log(employeeCount);
						console.log(usersinapp);
						console.log(employeeAttendance);*/
						var employeeAttendanceCount = [];
						_.forEach(employeeAttendance, (attendances) => {
							var count = 0;
							_.forEach(attendances, (attendance) => {
								if (attendance.employeeId) {
									count++;
								}
								
							});
							employeeAttendanceCount.push(count);
						});

						var userinappCount = [];
						_.forEach(usersinapp, (usersinappcampus) =>{
							var totaluser = 0;
							_.forEach(usersinappcampus, (users) => {
								if(users.userId){
									 totaluser++;
								}
							});
							userinappCount.push(totaluser);
						})
						var results  = {};
						var collections  = [];
						for(var i=0; i<campuses.length; i++){
							collections[i] = {}
							collections[i].campus = campuses[i].name/*campusNames[i]*/;
							collections[i].Users = userCounts[i];
							collections[i].visitors = visitorCounts[i];
							collections[i].EmployeeAttendance = employeeAttendanceCount[i];
							collections[i].Userinapp = userinappCount[i];							
						}
						results = collections;
						res.json({
							results: results})
					});
				});
			}
		})
	}
}
															
module.exports.validtoken = validtoken;
							




/*var jwt = require('jsonwebtoken');
var supersecret = 'alliswell';
var index = require('./login');
var usercampus = require('./usercampus');
function validtoken (req, res, next){
	var token = req.body.token || req.param(token) || req.headers['x-access-token'];
	// res.render(__dirname + '/../view/campuslist.ejs');
	if(token){
			console.log(token);	
		jwt.verify(token, supersecret, function(err, decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message:'Failed to authenticate token',
				});
			}
			else{
				req.decded = decoded;/*
				var promise = usercampus.find().exec()
				promise.then((result) => {
				res.json({
				/*	result : result
				campuse: [ 'abc', 
							'xyz'
							]
						//Dummy list of campuse
				});
/*			});
				/*res.render(__dirname + '/../view/campuslist.ejs');
				next();
			}
		});
	}
	/*else{
		res.status(403).send({
			success:false,
			messsage:'token not provided',
		});
	}
  
};
module.exports.validtoken = validtoken;*/








							/*Campuses: campusNames,
							userCounts: userCounts,
							visitorCounts: visitorCounts,
							employeeCount: employeeCount,

						});
					}); 
					
					
					
					 
					
					/*console.log(result);*/
					
				
				// res.json({
					// visitorSMR: visitorSMR,
					// visitorMantri: visitorMantri,
					// users : count
				// });
			
			
		











				/*res.render(__dirname + '/../view/login.ejs');*/
				/*res.json({
					campuses : [
						//Dummy list of campuses htdkf dthdnffno h
						'Mantri residency',
						'Mantri Paradise'
					]
                 
				})*/
				/*res.render(__dirname + '/../view/campuslist.ejs');*/
			/*	next();*/
			
	/*else{
		res.status(403).send({
			success:false,
			messsage:'token not provided',
		});
	}*/
  


					_/*.forEach(campuses, (campus) => {
						allPromises.push(attendance.find({}).populate({path: 'employeeId', model: 'employee1', select: '_id'})
						.count({employeeId: employee._id},{ campusId: campus._id}));
					});
					_.forEach(campuses, (campus) => {
						allPromises.push(attendance.find({}).populate({path: 'employeeId', model: 'employee2', select: '_id'})
						.count({employeeId: employee._id },{campusId: campus._id}));
					});
					_.forEach(campuses, (campus) => {
						allPromises.push(attendance.find({}).populate({path: 'employeeId', model: 'employee3', select: '_id'})
						.count({employeeId: employee._id},{ campusId: campus._id}));
					});
					_.forEach(campuses, (campus) => {
						allPromises.push(attendance.find({}).populate({path: 'employeeId', model: 'employee4', select: '_id'})
						.count({employeeId: employee._id},{ campusId: campus._id}));
					});
*/

					/*Promise.all(promises1).then((results1) => {
						console.log(results1);
						// res.json({
						// 	result: campuses,
						// 	countvisitors: results1
						// })
					});
					Promise.all(promises2).then((results2) => {
						console.log(results2);
					});
*/