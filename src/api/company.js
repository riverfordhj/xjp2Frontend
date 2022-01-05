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

export function getRoomByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetRoomByBuilding`,
		method: 'get',
		params: {
			BuildingName,
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


// 返回指定楼栋税收前十
export function getCountTaxByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetCountTaxByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function GetTaxTop(){
	return request({
		url: `/Combasic/GetTaxTop`,
		method: 'get',
	})
}

//返回指定楼栋营收前十
export function getCountRevenueByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetCountRevenueByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function GetRevenueTop(){
	return request({
		url: `/Combasic/GetRevenueTop`,
		method: 'get',
	})
}

  //返回指定楼栋总税收、总营收
export function getTotalTaRByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetTotalTaRByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function getTotalTaR(){
	return request({
		url: `/Combasic/GetTotalTaRByBuilding`,
		method: 'get',
	})
}

  //返回指定楼栋产业分类及产业总营收、税收
export function getIndustryTypeByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetIndustryTypeByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function getIndustryType(){
	return request({
		url: `/Combasic/GetIndustryTypeByBuilding`,
		method: 'get',
	})
}

  //返回指定楼栋营收分布
  export function getRevenueRoundByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetRevenueRoundByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function getRevenueRound(){
	return request({
		url: `/Combasic/GetRevenueRoundByBuilding`,
		method: 'get',
	})
}

  //返回指定楼栋税收分布
  export function getTaxRoundByBuilding(BuildingName){
	return request({
		url: `/Combasic/GetTaxRoundByBuilding`,
		method: 'get',
		params: {
			BuildingName,
		}
	})
}

export function getTaxRound(){
	return request({
		url: `/Combasic/GetTaxRoundByBuilding`,
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

