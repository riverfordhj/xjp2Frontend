import request from '@/utils/request'

export function getCompanyInfo(){
	return request({
		url: '/Companies',
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
		url: '/Companies/getDemoData',
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