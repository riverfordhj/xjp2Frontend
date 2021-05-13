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

export function batchingRoomsData(batchingParam){
	return request({
		url: '/Rooms/BatchingCreateRooms',
		method: 'post',
		data: batchingParam
	})
}

export function batchingRoomsDataWithExcel(tableList){
	return request({
    url: '/Rooms/BatchingCreateRoomsWithExcel',
		method: 'post',
		data: tableList
  })
}

export function GetRoomsByBuildingData(buildingName, address) {
  return request({
    url: '/Rooms/GetRoomsByBuilding',
    method: 'get',
    params: {
			buildingName,
			address
    }
  })
}

export function deleteRoom(roomObj) {
  return request({
    url: '/Rooms/DeleteTargetRoom',
    method: 'post',
    data: roomObj
  })
}

export function updateRoom(roomObj) {
  return request({
    url: '/Rooms/UpdateTargetRoom',
		method: 'post',
    data: roomObj
  })
}

