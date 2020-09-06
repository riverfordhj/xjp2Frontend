import request from '@/utils/request'

export function getPersonByRoom(roomInfo) {
  return request({
    url: '/person/GetPersonsInRoom',
    method: 'post',
    data: roomInfo
  })
}

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
