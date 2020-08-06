import request from '@/utils/request'

export function getPeopleByResidents(HouseId) {
  return request({
    url: '/people/getPeopleByResidents',
    method: 'get',
    params: {
      HouseId: HouseId
    }
  })
}

export function getPeopleByBuilding(BuildingName) {
  return request({
    url: '/people/getPeopleByBuilding',
    method: 'get',
    params: {
      BuildingName: BuildingName
    }
  })
}
