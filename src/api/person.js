import request from '@/utils/request'

export function getBuildingsBySub(subId) {
  return request({
    url: `/person/GetBuildingInSubdivision/${subId}`,
    method: 'get'
  })
}

export function getCommunitys() {
  return request({
    url: '/person/GetCommunitys',
    method: 'get'
  })
}

export function getNetGridInCommunity(commuityId) {
  return request({
    url: `/person/GetNetGridInCommunity/${commuityId}`,
    method: 'get'
  })
}

export function getBuildingInNetGrid(netId) {
  return request({
    url: `/person/GetBuildingInNetGrid/${netId}`,
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
//通过网格查找人员信息（返回中文数据）
export function GetPersonsByNetGrid_ZH(netGridId) {
  return request({
    url: `/person/GetPersonsByNetGrid_ZH/${netGridId}`,
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
//通过网格查找人员信息
export function getPersonsByNetGrid(netId) {
  return request({
    url: `/person/GetPersonsByNetGrid/${netId}`,
    method: 'get'
  })
}


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
export function getFields() {
  return request({
    url: '/person/GetFields',
    method: 'get'
  })
}

export function getDataByQuery(dataForms) {
  return request({
    url: '/person/GetDataByQuery',
    method: 'post',
    data: {
      Items: dataForms
    },
    //dataForms, JSON.stringify(arrdataForms),
  })
}

export function getPersonByRoom(roomInfo) {
  return request({
    url: '/person/GetPersonsInRoom',
    method: 'post',
    data: roomInfo
  })
}

export function getRoomId(roomInfo) {
  return request({
    url: '/person/GetRoomId',
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

//（网格员）修改人房数据
export function updatePersonHouseByNetGrid(editParams) {
	return request({
		url: '/person/UpdatePersonHouseByNetGrid',
		method: 'post',
		data: editParams
	})
}

//（网格员）修改人房数据（不返回数据）
export function updatePersonHouseByNetGrid_void(editParams) {
	return request({
		url: '/person/UpdatePersonHouseByNetGrid_void',
		method: 'post',
		data: editParams
	})
}

//社区审核网格员修改后的人房数据
export function VerifyByCommunity(VerifyData) {
  return request({
    url: '/person/VerifyByCommunity',
		method: 'post',
    data: VerifyData
  })
}
//admin（街道）批准社区审核后的人房数据
export function ConfirmByAdmin(confirmData) {
  return request({
    url: '/person/ConfirmByAdmin',
    method: 'post',
    data: confirmData
  })
}

//返回指定网格内的楼栋
export function GetBuildingsByNetGrid() {
  return request({
    url: '/person/GetBuildingsByNetGrid',
    method: 'get'
  })
}
//返回指定楼栋内的房间
export function GetRoomsByBuildingAndNetgrid(buildingName) {
  return request({
    url: '/person/GetRoomsByBuildingAndNetgrid',
		method: 'get',
		params: {
      buildingName
    }
  })
}
export function GetPersonHouseHistoryInfo() {
  return request({
    url: '/person/GetPersonHouseHistoryInfo',
		method: 'get'
  })
}

//返回指定网格员提交后的数据（社区审核之前）
export function SearchPersonHouseByNetGrid() {
  return request({
    url: '/person/SearchPersonHouseByNetGrid',
		method: 'get'
  })
}

//批处理新建personHouseData
export function BatchingPersonHouseData(tableList) {
  return request({
    url: '/person/BatchingPersonHouseData',
		method: 'post',
		data: tableList
  })
}

/* ****** */