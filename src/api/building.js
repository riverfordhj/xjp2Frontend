import request from '@/utils/request'

export function getBuildingByName(title) {
  return request({
    url: '/Building/GetBuildingByName',
    method: 'get',
    params: {
      BuildingName: title
    }
  })
}
