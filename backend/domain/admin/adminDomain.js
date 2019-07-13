var domainTools = require( "../domainTools" );
var adminDatabase = require( '../../db/admin/adminDatabase' );
var bcrypt = require( 'bcrypt' );
var emailValidator = require( 'email-validator' );
var ObjectID = require( 'mongodb' ).ObjectID;


exports.getAllAdmins = async () => {
	return ( await adminDatabase.getAllAdmins() );
};


exports.createAdmin = async ( competition ) => {
	if ( !competition.name ) throw { code: 422, message: "Invalid admin name" };
	if ( !admin.email || !emailValidator.validate( admin.email ) ) throw { code: 422, message: "Invalid admin email" };
	if ( !admin.password || ( admin.password.length < 8 || admin.password.length > 16 ) ) {
		throw { code: 422, message: "Invalid password" };
	} else {
		admin.password = ( await domainTools.encryptPassword( admin.password ) );
	}
	
	let existingAdmin = ( await adminDatabase.getAdminByEmail( admin.email ) );
	if ( existingAdmin ) {
		throw { code: 422, message: "Email is already in use" };
	}
	
	return ( await adminDatabase.createAdmin( admin ) );
};


exports.updateAdmin = async ( id, admin ) => {
	if ( !id || !ObjectID.isValid( id ) ) throw { code: 422, message: "Invalid id" };
	if ( !admin.email || !emailValidator.validate( admin.email ) ) throw { code: 422, message: "Invalid email" };
	if ( !admin.name ) throw { code: 422, message: "Invalid admin name" };
	
	let existingAdminByEmail = ( await adminDatabase.getAdminByEmail( admin.email ) );
	let existingAdminById = ( await adminDatabase.getAdminById( id ) );
	if ( !existingAdminById )
		throw { code: 422, message: "Specified admin is not in system" };
	if ( existingAdminByEmail && !existingAdminByEmail._id.equals( existingAdminById._id ) )
		throw { code: 422, message: "Email is already in use" };
	
	return ( await adminDatabase.updateAdmin( id, admin ) );
};


exports.updateAdminPassword = async ( id, password ) => {
	if ( !id || !ObjectID.isValid( id ) ) throw { code: 422, message: "Invalid admin id" };
	if ( !password || ( password.length < 8 || password.length > 16 ) ) {
		throw { code: 422, message: "Invalid password" };
	} else {
		var newPassword = ( await domainTools.encryptPassword( password ) );
	}
	
	let existingAdmin = ( await adminDatabase.getAdminById( id ) );
	if ( !existingAdmin ) {
		throw { code: 422, message: "Specified admin is not in system" };
	}
	existingAdmin.password = newPassword;
	
	return ( await adminDatabase.updateAdmin( id, existingAdmin ) );
};


exports.deleteAdmin = async ( id ) => {
	if ( !id || !ObjectID.isValid( id ) ) throw { code: 422, message: "Invalid admin id." };
	
	let existingAdmin = ( await adminDatabase.getAdminById( id ) );
	if ( !existingAdmin ) {
		throw { code: 422, message: "Specified admin is not in system" };
	}
	
	return ( await adminDatabase.deleteAdmin( id ) );
};


exports.getAdminByEmailAndPassword = async ( email, password ) => {
	let admin = await adminDatabase.getAdminByEmail( email );
	if ( !admin ) {
		return null;
	}
	/*if ( admin.password !== password ) {
		console.log( admin.password, password );
		return null;
	}*/
	return admin;
};