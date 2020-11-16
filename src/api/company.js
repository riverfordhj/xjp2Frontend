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

export function GetCompanysByBuilding_ZH(id){
	return request({
		url: `/Companies/GetCompanysByBuilding_ZH/${id}`,
		method: 'get'
	})
}

export function GetCompanysByFloor_ZH(arrData){
	return request({
		url: '/Companies/GetCompanysByFloor_ZH',
		method: 'post',
		data: arrData
	})
}

export function GetWholeCompanys_ZH(){
	return request({
		url: '/Companies/GetWholeCompanys_ZH',
		method: 'get'
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