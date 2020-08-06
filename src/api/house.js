import request from '@/utils/request'

export function getHousesByBuilding(BuildingId) {
  return request({
    url: '/house/GetHousesByBuilding',
    method: 'get',
    params: {
      BuildingId: BuildingId
    }
  })
}

export function getHousesByBuildingName(BuildingName) {
  return request({
    url: '/house/GetHousesByBuildingName',
    method: 'get',
    params: {
      BuildingName: BuildingName
    }
  })
}
