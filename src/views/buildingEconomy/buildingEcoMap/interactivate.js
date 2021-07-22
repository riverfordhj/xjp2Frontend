var Cesium = require('cesium/Cesium');
import { getCompanyInfoByRoom } from '@/api/company.js'
import { flatCompanyInfo } from '@/utils/tools.js'

// 定义3dTiles模型所选要素的交互形式
export {
  interactOperate
}


var interactOperate = {
  viewer: null, // cesium viewer
	companyDatas: null,
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
		
		const buildingFloor = this.getBuildingFloor(pickedFeature);
		if(!buildingFloor){
			this.nameOverlay.style.display = 'none';
		}

    this.nameOverlay.style.display = 'block'
    this.nameOverlay.style.bottom = this.viewer.canvas.clientHeight - movement.endPosition.y + 'px'
    this.nameOverlay.style.left = movement.endPosition.x + 'px'
    // debugger
    this.nameOverlay.textContent = buildingFloor;

    // Highlight the feature if it's not already selected.
    if (pickedFeature !== this.selected.feature) {
      this.highlighted.feature = pickedFeature
      Cesium.Color.clone(pickedFeature.color, this.highlighted.originalColor)
      pickedFeature.color = this.colorHighlight
    }
	},
	
	//获取pickedFeature属性，返回拼接字符串
	getBuildingFloor (pickedFeature){
		const buildingName = pickedFeature.getProperty('buildingid');
		const floorNum = pickedFeature.getProperty('floor');

		return `${buildingName}-第${floorNum}层`;
	},

  // mouseclick事件处理
  onLeftClick(movement) {
    debugger
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

  },
  // 高亮处理选择room
  setSelectedFeature(room) {
    // Select the feature if it's not already selected
    if (this.selected.feature === room) {
      return
    }
    // If a feature was previously selected, undo the highlight
    if (Cesium.defined(this.selected.feature)) {
      this.selected.feature.color = this.selected.originalColor
      this.selected.feature = undefined
    }

    if (!Cesium.defined(room.getProperty)) return

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
    // debugger
    if (!Cesium.defined(pickedFeature)) {
      return null
    } else {
      return pickedFeature
    }
  },
  // 根据屏幕坐标及特定值选取 feature
  pickTargetFeature(position, targetValue) {
    const features = this.viewer.scene.drillPick(position)
    //debugger
    for (let i = 0; i < features.length; i++) {
      const feature = features[i]
      if (!Cesium.defined(feature)) {
        continue
      } else {
        const floorNum = this.getFloorNum(feature);
        if (floorNum === targetValue) {
          return feature
        }
      }
    }
    return null
	},
	
	getFloorNum(feature){
		if(!Cesium.defined(feature) || !Cesium.defined(feature.getProperty)){
			return ''
		};
		
		const floor = feature.getProperty('roomid');
		if(!floor){
			return '';
		}else{
			return floor;
		}
	
	},

  FlytoFloor(position, targetValue) {
    debugger
		this.floorNO = targetValue;

    var longitude = Cesium.Math.toRadians(
      position.long
    )
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
     debugger
    const ow = document.getElementById('cesiumContainer').offsetWidth / 2
    const oh = document.getElementById('cesiumContainer').offsetHeight / 2

    const position = {
      x: ow,
      y: oh
    }

    // Pick a new feature
    debugger
    const room = this.pickTargetFeature(position, this.floorNO)

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
    const companyInfo = {}
    companyInfo.buildingName = pickedFeature.getProperty('buildingid')
		companyInfo.roomName = pickedFeature.getProperty('roomid')
		
		this.companyDatas.title = `${companyInfo.buildingName} - ${companyInfo.roomName}`;
   
    this.getCompanyFullInfo(companyInfo) // JSON.stringify(

    // debugger
    this.setSelectedEntity(pickedFeature)
	},
	
	//后端获取数据
	getCompanyFullInfo(companyInfo){
		getCompanyInfoByRoom(companyInfo).then(res => {
			// debugger;
			if(this.companyDatas.show !== true){
				this.companyDatas.show = true;
			}
			this.companyDatas.companiesFullInfo = flatCompanyInfo(res);
		}).catch(err => {
			console.log(err);
		});
	},
 
  // 设置entity, 及属性，并在viewer中选择
  setSelectedEntity(pickedFeature) {
    const selectedEntity = new Cesium.Entity()
    selectedEntity.name = this.getBuildingFloor(pickedFeature);
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>'
    this.viewer.selectedEntity = selectedEntity

		// debugger;
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
  install(viewer, companyDatas) {
    // debugger

    this.viewer = viewer
    this.companyDatas = companyDatas
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
