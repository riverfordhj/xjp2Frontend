//专用于处理getCompanyInfo API返回结果的函数 : 扁平化数据（数组）的元素对象
function flatCompanyInfo (response){
	let result = [];
	response.forEach(item =>{
		let row = {};
		for(let o in item){
			let tar = item[o];
			if(typeof tar === 'object' &&  tar != null){
				for(let key in tar){
					row[key] = tar[key]
				}
			}else{
				row[o] = item[o];			
			}
		}
		result.push(row)
	});

	return result;
}

/**
 * 
 * @param {被克隆的对象} origin 
 * @param {副本对象} target 
 */

var deepClone = function (origin, target){
	var target = target || {};
	var toStr = Object.prototype.toString;
	var arrType = '[object Array]';
	for(var item in origin){
		if(origin.hasOwnProperty(item)){
			if(typeof(origin[item]) === 'object' && origin[item] !== null){
				if(toStr.call(origin[item]) === arrType){
					target[item] = [];
				}else{
					target[item] = {};
				}
				deepClone(origin[item], target[item]);
			}else{
				target[item] = origin[item];
			}
		}
	}
	return target
}

export {
	flatCompanyInfo, deepClone
};