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

export {
	flatCompanyInfo
};