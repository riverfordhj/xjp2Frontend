import store from '@/store'

/**
 * 
 * @param {String} roleValue
 * @returns {Boolean} 
 */
function checkPermission(roleValue){
	if(Object.prototype.toString.call(roleValue) === '[object String]' && roleValue.length > 0){
		const role = store.getters.role;
		const permissionRole = roleValue;
		return role === permissionRole;
	}else{
		console.log('Need role');
		return false;
	}

}

export default checkPermission;