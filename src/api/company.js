import request from '@/utils/request'

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

export function getCompanysByBuilding(id){
	return request({
		url: `/Companies/getCompanysByBuilding/${id}`,
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

export function getInfoByFloor(arrData){
	return request({
		url: '/Companies/GetInfoByFloor',
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