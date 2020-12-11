import request from '@/utils/request'

export function getBuildingsBySub(subId) {
  return request({
    url: `/person/GetBuildingInSubdivision/${subId}`,
    method: 'get'
  })
}

export function getSubdivsions() {
  return request({
    url: '/person/GetSubdivsions',
    method: 'get'
  })
}


export function getPersons() {
  return request({
    url: '/person/GetPersons',
    method: 'get'
  })
}

export function getPersonsByBuilding(buildingId) {
  return request({
    url: `/person/GetPersonsByBuilding/${buildingId}`,
    method: 'get'
  })
}
//通过楼栋查找人员信息（返回中文数据）
export function GetPersonsByBuilding_ZH(buildingId) {
  return request({
    url: `/person/GetPersonsByBuilding_ZH/${buildingId}`,
    method: 'get'
  })
}

export function getPersonsBySubdivision(subdivisionId) {
  return request({
    url: `/person/GetPersonsBySubdivision/${subdivisionId}`,
    method: 'get'
  })
}

// export function getPersonsBySearch(str) {
//   return request({
//     url: `/person/GetPersonsBySearch/${str}`,
//     method: 'get'
//   })
// }
export function getPersonsBySearch(subdivsion ,sname) {
  return request({
    url: '/person/getPersonsBySearch',
    method: 'post',
    data: {
      SubdivisionId: subdivsion,
      Name: sname
    }
  })
}

export function getSpecialGroups() {
  return request({
    url:  '/person/GetSpecialGroups',
    method: 'get'
  })
}

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

// export function getPeopleByBuilding(BuildingName) {
//   return request({
//     url: '/people/getPeopleByBuilding',
//     method: 'get',
//     params: {
//       BuildingName: BuildingName
//     }
//   })
// }

// 通过楼栋号查找room
export function getRoomByBuilding(buildingId) {
  return request({
    url: `/person/getRoomByBuilding/${buildingId}`,
    method: 'get'
  })
}

/* ***认证、授权*** */
//根据用户，返回小区数据
export function GetSubdivsionsByUser() {
  return request({
    url: '/person/GetSubdivsionsByUser',
    method: 'get'
  })
}

//根据用户，返回房间数据
export function GetRoomsByUser() {
  return request({
    url: `/person/GetRoomsByUser`,
    method: 'get'
  })
}

//根据用户，返回人房数据
export function GetPersonHouseInfoByUser() {
	return request({
		url: '/person/GetPersonsByUser',
		method: 'get'
	})
}

//根据用户，返回人房数据
export function updatePersonHouseByNetGrid(editParams) {
	return request({
		url: '/person/UpdatePersonHouseByNetGrid',
		method: 'post',
		data: editParams
	})
}

export function ReviewByCommunity(personId, status) {
	debugger;
  return request({
    url: '/person/ReviewByCommunity',
		method: 'post',
    data:	{
			personId,
			status
		}
  })
}

export function ConfirmByAdmin(personId) {
  return request({
    url: '/person/ConfirmByAdmin',
    method: 'get',
    params: {
      personId
    }
  })
}


/* ****** */