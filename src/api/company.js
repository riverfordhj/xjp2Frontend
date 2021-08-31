import request from '@/utils/request'


export function getCompanyInfoByRoom(arrData){
	return request({
		url: '/Combasic/GetInfoByRoom',
		method: 'post',
		data: arrData
	})
}

export function getBuildings(){
	return request({
		url: '/Combasic/GetBuildings',
		method: 'get'
	})
}
// export function getBuindingInfoByStatus(statusParam){
// 	let status = statusParam || '已建';
// 	return request({
// 		url: '/CompanyBuildings/GetBuildingInfoByStatus',
// 		method:'get',
// 		params: {
// 			status
// 		}
// 	})
// }
export function getBuildingFloors(buildingName){
	return request({
		url: '/Combasic/GetBuildingFloor',
		method: 'get',
		params: {
			buildingName:buildingName
		}
	})
}

export function getCompanysByBuilding(id){
	return request({
		url: `/Combasic/getCompanysByBuilding/${id}`,
		method: 'get'
	})
}

export function getInfoByBuildingNameAndFloor(buildingNameParam, floorParam){
	let BuildingName = buildingNameParam;
	let Floor = floorParam;
	return request({
		url: '/Combasic/getInfoByBuildingNameAndFloor',
		method:'get',
		params: {
			BuildingName,
			Floor
		}
	})
}

export function GetWholeCompanys_ZH(){
	return request({
		url: '/Combasic/GetWholeCompanys_ZH',
		method: 'get'
	})
}

export function GetCompanysByBuilding_ZH(id){
	return request({
		url: `/Combasic/GetCompanysByBuilding_ZH/${id}`,
		method: 'get'
	})
}

export function getCompanyBySearch(sname) {
	return request({
	  url:`/Combasic/GetCompanyBySearch/${sname}`,
	  method: 'get',
	})
}



export function getCompanyInfo(){
	return request({
		url: '/Companies/GetBuildingCompany',
		method: 'get'
	})
}

export function getCompanyBuildings(){
	return request({
		url: '/CompanyBuildings',
		method: 'get'
	})
}




export function getCompanySomeFileds(){
	return request({
		url: '/Companies/getBuildingEcoFields',
		method: 'get'
	})
}

export function updateCompanyFields(arrayData){
	return request({
		url: '/Companies/CompanyFields',
		method: 'post',
		data: arrayData
	})
}

export function deleteCompany(arr){
	return request({
		url: '/Companies/DeleteCompanyByName',
		method: 'post',
		data: arr
	})
}





export function GetCompanysByFloor_ZH(arrData){
	return request({
		url: '/Companies/GetCompanysByFloor_ZH',
		method: 'post',
		data: arrData
	})
}



export function getFloorInfoByBuilding(id){
	return request({
		url: `/CompanyBuildings/GetFloorInfoByBuilding/${id}`,
		method: 'get'
	})
}

export function getCompanyTaxInfo(){
	return request({
		url: '/Companies/GetCompanyTaxInfo',
		method: 'get'
	})
}

//参数：buildingName(楼栋名)、status(状态)
export function updateBuildingStatus(buildingName, status){
	let JsonData = {
		"BuildingName": buildingName,
		"status" : status
	};

	return request({
		url: '/CompanyBuildings/UpdateBuildingStatus',
		method: 'post',
		data: JsonData
	})
}

