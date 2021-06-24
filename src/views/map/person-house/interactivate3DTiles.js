// 定义3dTiles模型所选要素的交互形式
export {
  interactOperate
}

var Cesium = require('cesium/Cesium')
import { getPersonByRoom } from '@/api/person.js'

var interactOperate = {
  viewer: null, // cesium viewer
  personHouseDataForm: null,
  // 当前高亮颜色
  colorHighlight: Cesium.Color.YELLOW.withAlpha(0.3),
  // 当前选中要素颜色
  colorSelected: Cesium.Color.LIME.withAlpha(0.3),
  // 当前选中要素，mouseclick
  selected: {
    feature: undefined,
    originalColor: new Cesium.Color()
  },
  // 当前高亮要素，mousemove
  highlighted: {
    feature: undefined,
    originalColor: new Cesium.Color()
  },
  // 鼠标移动到room时，显示该html元素
  nameOverlay: null,
  middleDown: false,
  leftDown: false,

  // 当前 roomNO
  roomNO: '',
  // 设置room浮动提示html元素
  SetupOverlap() {
    this.nameOverlay = document.createElement('div')
    this.nameOverlay.className = 'backdrop'
    this.nameOverlay.style.display = 'none'
    this.nameOverlay.style.position = 'absolute'
    this.nameOverlay.style.bottom = '0'
    this.nameOverlay.style.left = '0'
    this.nameOverlay.style['pointer-events'] = 'none'
    this.nameOverlay.style.padding = '4px'
    this.nameOverlay.style.backgroundColor = 'black'
    this.nameOverlay.style.color = 'white'
    this.viewer.container.appendChild(this.nameOverlay)
  },

  // 恢复高亮 3D feature 显示
  restoreHighlight() {
    // If a feature was previously highlighted, undo the highlight
    if (Cesium.defined(this.highlighted.feature)) {
      try {
        this.highlighted.feature.color = this.highlighted.originalColor
      } catch (ex) {
        console.log(ex)
      }
      this.highlighted.feature = undefined
    }
  },
  // 设置mousemove事件处理
  setMouseOver(v) {
    if (v) {
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.onMouseMove.bind(this), // cesium 鼠标事件中调用该函数，因此需绑定this对象
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      )
    } else {
      this.restoreHighlight()

      this.nameOverlay.style.display = 'none'
      this.viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      )
    }
  },
  // 设置mouseclick 事件处理
  setMouseClick(v) {
    if (v) {
      this.orginClickHandler = this.viewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.onLeftClick.bind(this), // cesium 鼠标事件中调用该函数，因此需绑定this对象
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
    } else {
      // 设置为原来的
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.orginClickHandler,
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
    }
  },
  // mousemove事件处理
  onMouseMove(movement) {
    this.restoreHighlight()

    if (this.middleDown || this.leftDown) {
      this.nameOverlay.style.display = 'none'
      return
    }

    // Pick a new feature
    var pickedFeature = this.viewer.scene.pick(movement.endPosition)
    if (!Cesium.defined(pickedFeature) || !Cesium.defined(pickedFeature.getProperty)) {
      this.nameOverlay.style.display = 'none'
      return
    }

    // A feature was picked, so show it's overlay content
    const name = this.getRoomNO(pickedFeature)

    if (!name) {
      this.nameOverlay.style.display = 'none'
      return
    }

    this.nameOverlay.style.display = 'block'
    this.nameOverlay.style.bottom = this.viewer.canvas.clientHeight - movement.endPosition.y + 'px'
    this.nameOverlay.style.left = movement.endPosition.x + 'px'

    // nameOverlay.textContent = '水岸星城党员群众服务中心'
    // debugger
    this.nameOverlay.textContent = name

    // Highlight the feature if it's not already selected.
    if (pickedFeature !== this.selected.feature) {
	    this.highlighted.feature = pickedFeature
      Cesium.Color.clone(pickedFeature.color, this.highlighted.originalColor)
      pickedFeature.color = this.colorHighlight
    }
  },
  // 构造房间号，70-2-1002
  getRoomNO(room) {
    if (!Cesium.defined(room) || !Cesium.defined(room.getProperty)) {
      return ''
    }

    const buildingId = room.getProperty('buildingid')
    const unitid = room.getProperty('unitid')
    const roomId = room.getProperty('roomid')

    if (!buildingId || !unitid || !roomId) {
      return ''
    }
    return `${buildingId}-${unitid}-${roomId}`
  },
  // 构造房间号，2-1002
  getSimpleRoomNO(room) {
    if (!Cesium.defined(room) || !Cesium.defined(room.getProperty)) {
      return ''
    }

    const unitid = room.getProperty('unitid')
    const roomId = room.getProperty('roomid')

    if (!unitid || !roomId) {
      return ''
    }
    return `${unitid}-${roomId}`
  },
  // mouseclick事件处理
  onLeftClick(movement) {
    // debugger
    // Pick a new feature
    const room = this.pickFeature(movement.position)

    if (room === null) {
      this.orginClickHandler(movement.position)
      return
    }
    // 设置高亮效果
    this.setSelectedFeature(room)

    // 显示属性面板
    this.setInfobox(room)

    // this.FlytoRoom(pickedFeature)
  },
  // 高亮处理选择room
  setSelectedFeature(room) {
    // Select the feature if it's not already selected
    if (this.selected.feature === room) {
      return;
    }
    // If a feature was previously selected, undo the highlight
    if (Cesium.defined(this.selected.feature)) {
      this.selected.feature.color = this.selected.originalColor
      this.selected.feature = undefined
    }

    if (!Cesium.defined(room.getProperty)){
			return;
		} 

    this.selected.feature = room

    // Save the selected feature's original color
    if (room === this.highlighted.feature) {
      Cesium.Color.clone(this.highlighted.originalColor, this.selected.originalColor)
      this.highlighted.feature = undefined
    } else {
      Cesium.Color.clone(room.color, this.selected.originalColor)
    }

    // Highlight newly selected feature
    room.color = this.colorSelected
  },
  // 根据屏幕坐标选取 room model
  pickFeature(position) {
    const pickedFeature = this.viewer.scene.pick(position)
     debugger
    if (!Cesium.defined(pickedFeature)) {
      return null
    } else {
      return pickedFeature
    }
  },
  // 根据屏幕坐标及roomNO选取 room model
  pickFeatureByRoomNO(position, roomNO) {
    const features = this.viewer.scene.drillPick(position)
    // debugger
    for (let i = 0; i < features.length; i++) {
      const feature = features[i]
      if (!Cesium.defined(feature)) {
        continue
      } else {
        const rN = this.getSimpleRoomNO(feature)
        if (rN === roomNO) {
          return feature
        }
      }
    }
    return null
  },

  FlytoRoom(position, roomNO) {
    // debugger
    this.roomNO = roomNO

    var longitude = Cesium.Math.toRadians(position.long)
    var latitude = Cesium.Math.toRadians(position.lat)
    var height = position.height

    var positionCartographic = new Cesium.Cartographic(
      longitude,
      latitude,
      height //* 0.5
    )
    var pos = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(
      positionCartographic
    )

    var camera = this.viewer.scene.camera
    var heading = camera.heading
    var pitch = camera.pitch
   
    var offset = this.offsetFromHeadingPitchRange(
      heading,
      pitch,
      120
    )
    debugger;
    var transform = Cesium.Transforms.eastNorthUpToFixedFrame(pos)
    Cesium.Matrix4.multiplyByPoint(transform, offset, pos)

    camera.flyTo({
      destination: pos,
      orientation: {
        heading: heading,
        pitch: pitch
      },
      easingFunction: Cesium.EasingFunction.QUADRATIC_OUT,
      complete: this.flytoComplete.bind(this)
    })
  },
  // 飞到room后，根据屏幕中心点选取room
  flytoComplete() {
    // debugger
    const ow = document.getElementById('cesiumContainer').offsetWidth / 2
    const oh = document.getElementById('cesiumContainer').offsetHeight / 2

    const position = {
      x: ow,
      y: oh
    }

    // this.onLeftClick(para)

    // Pick a new feature
    const room = this.pickFeatureByRoomNO(position, this.roomNO)

    if (room === null) {
      return
    }
    // 设置高亮效果
    this.setSelectedFeature(room)

    // 显示属性面板
    this.setInfobox(room)
  },

  offsetFromHeadingPitchRange(heading, pitch, range) {
    pitch = Cesium.Math.clamp(
      pitch,
      -Cesium.Math.PI_OVER_TWO,
      Cesium.Math.PI_OVER_TWO
    )
    heading = Cesium.Math.zeroToTwoPi(heading) - Cesium.Math.PI_OVER_TWO

    var pitchQuat = Cesium.Quaternion.fromAxisAngle(
      Cesium.Cartesian3.UNIT_Y,
      -pitch
    )
    var headingQuat = Cesium.Quaternion.fromAxisAngle(
      Cesium.Cartesian3.UNIT_Z,
      -heading
    )
    var rotQuat = Cesium.Quaternion.multiply(
      headingQuat,
      pitchQuat,
      headingQuat
    )
    var rotMatrix = Cesium.Matrix3.fromQuaternion(rotQuat)

    var offset = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_X)
    Cesium.Matrix3.multiplyByVector(rotMatrix, offset, offset)
    Cesium.Cartesian3.negate(offset, offset)
    Cesium.Cartesian3.multiplyByScalar(offset, range, offset)
    return offset
  },

  // Set feature infobox description
  setInfobox(pickedFeature) {
    const roomInfo = {}
    roomInfo.NetGridName = pickedFeature.getProperty('netid')
    roomInfo.AddressName = pickedFeature.getProperty('newid')
    roomInfo.BuildingName = pickedFeature.getProperty('buildingid')
    const unit = pickedFeature.getProperty('unitid')
    const roomId = pickedFeature.getProperty('roomid')
    roomInfo.RoomNO = `${unit}-${roomId}`

    this.personHouseDataForm.roomid = `${roomInfo.AddressName}-${roomInfo.BuildingName}-${roomInfo.RoomNO}`
    // debugger
    this.getPersonInRoom(roomInfo) // JSON.stringify(

    // debugger
    this.setSelectedEntity(pickedFeature)
  },
  // 获取后台数据
  getPersonInRoom(roomInfo) {
    debugger
    getPersonByRoom(roomInfo).then(response => { // login{      username: 'hj',      password: 'password'    }
      // debugger
      if (this.personHouseDataForm.show !== true) {
        this.personHouseDataForm.show = true
      }

      this.personHouseDataForm.personInRoom = response
    }).catch(error => {
      console.log(error)
    })
  },
  // 设置entity, 及属性，并在viewer中选择
  setSelectedEntity(pickedFeature) {
    const selectedEntity = new Cesium.Entity()
    selectedEntity.name = pickedFeature.getProperty('roomid')
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>'
    this.viewer.selectedEntity = selectedEntity

    var names = pickedFeature._content.batchTable.getPropertyNames(
      pickedFeature._batchId
    )

    let html = '<table class="cesium-infoBox-defaultTable"><tbody>'

    for (var i = 0; i < names.length; i++) {
      var n = names[i]
      html +=
        '<tr><th>' +
        n +
        '</th><td>' +
        pickedFeature.getProperty(n) +
        '</td></tr>'
    }
    html += '</tbody></table>'

    selectedEntity.description = html
  },
  // 对cesium viewer 进行配置，响应鼠标事件，对 3dtile feature 选择、高亮显示
  install(viewer, personHouseDataForm) {
    // debugger

    this.viewer = viewer
    this.personHouseDataForm = personHouseDataForm

    this.SetupOverlap()

    this.leftDown = false
    this.middleDown = false

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.leftDown = true
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.leftDown = false
    }, Cesium.ScreenSpaceEventType.LEFT_UP)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.middleDown = true
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.middleDown = false
    }, Cesium.ScreenSpaceEventType.MIDDLE_UP)

    this.setMouseOver(true)
    this.setMouseClick(true)
  }
}
