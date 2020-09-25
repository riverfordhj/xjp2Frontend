import request from '@/utils/request'

export function getCompanyInfo(){
	return request({
		url: '/Companies/GetBuildingCompany',
		method: 'get'
	})
}