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
    var name = pickedFeature.getProperty('roomid')
    if (!Cesium.defined(name)) {
      name = pickedFeature.getProperty('id')
    }

    if (name === '') {
      this.nameOverlay.style.display = 'none'
      return
    }

    this.nameOverlay.style.display = 'block'
    this.nameOverlay.style.bottom = this.viewer.canvas.clientHeight - movement.endPosition.y + 'px'
    this.nameOverlay.style.left = movement.endPosition.x + 'px'

    // nameOverlay.textContent = '水岸星城党员群众服务中心'
    this.nameOverlay.textContent = name

    // Highlight the feature if it's not already selected.
    if (pickedFeature !== this.selected.feature) {
      this.highlighted.feature = pickedFeature
      Cesium.Color.clone(pickedFeature.color, this.highlighted.originalColor)
      pickedFeature.color = this.colorHighlight
    }
  },
  // mouseclick事件处理
  onLeftClick(movement) {
    // If a feature was previously selected, undo the highlight
    if (Cesium.defined(this.selected.feature)) {
      try {
        this.selected.feature.color = this.selected.originalColor
      } catch (ex) {
        console.log(ex)
      }
      this.selected.feature = undefined
    }

    // Pick a new feature
    var pickedFeature = this.viewer.scene.pick(movement.position)
    if (!Cesium.defined(pickedFeature)) {
      this.orginClickHandler(movement)
      return
    }

    // Select the feature if it's not already selected
    if (this.selected.feature === pickedFeature) {
      return
    }

    if (!Cesium.defined(pickedFeature.getProperty)) return

    this.selected.feature = pickedFeature

    // Save the selected feature's original color
    if (pickedFeature === this.highlighted.feature) {
      Cesium.Color.clone(this.highlighted.originalColor, this.selected.originalColor)
      this.highlighted.feature = undefined
    } else {
      Cesium.Color.clone(pickedFeature.color, this.selected.originalColor)
    }

    // Highlight newly selected feature
    pickedFeature.color = this.colorSelected

    this.setInfobox(pickedFeature)
  },

  // Set feature infobox description
  setInfobox(pickedFeature) {
    const roomInfo = {}
    roomInfo.CommunityName = '水岸星城' // pickedFeature.getProperty('community')
    roomInfo.BuildingName = 'G3' // pickedFeature.getProperty('buildingid')
    roomInfo.RoomNO = '1-202' // pickedFeature.getProperty('roomid')
    // debugger
    this.getPersonInRoom(roomInfo) // JSON.stringify(

    // debugger
    this.setSelectedEntity(pickedFeature)
  },
  // 获取后台数据
  getPersonInRoom(roomInfo) {
    getPersonByRoom(roomInfo).then(response => { // login{      username: 'hj',      password: 'password'    }
      debugger
      console.log('返回人员数据P, ', response)
      this.personHouseDataForm.show = true
      this.personHouseDataForm.roomid = roomInfo.roomNO
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
