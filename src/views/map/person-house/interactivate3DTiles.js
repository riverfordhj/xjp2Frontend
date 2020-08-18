// 定义3dTiles模型所选要素的交互形式
export {
  interactOperate
}

var Cesium = require('cesium/Cesium')

var interactOperate = {
  viewer: {},
  colorHighlight: Cesium.Color.YELLOW.withAlpha(0.3),
  colorSelected: Cesium.Color.LIME.withAlpha(0.3),
  selected: {
    feature: undefined,
    originalColor: new Cesium.Color()
  },
  highlighted: {
    feature: undefined,
    originalColor: new Cesium.Color()
  },

  setMouseOver: function (v) {
    if (v) {
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.onMouseMove,
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
  setMouseClick: function (v) {
    if (v) {
      this.orginClickHandler = this.viewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.onLeftClick,
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

  //Set feature infobox description
  setInfobox(pickedFeature) {
    var featureName = pickedFeature.getProperty('gid')
    debugger
    const selectedEntity = new Cesium.Entity()
    selectedEntity.name = featureName
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>'
    this.viewer.selectedEntity = selectedEntity

    var names = pickedFeature._content.batchTable.getPropertyNames(
      pickedFeature._batchId
    )

    // 普通3dtiles 获取属性表格
    var html = get3dTilesHtml(pickedFeature)

    if (!html) {
      html = '<table class="cesium-infoBox-defaultTable"><tbody>'

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
    }

    selectedEntity.description = html
  },

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

  install: function (viewer) {
    this.viewer = viewer

    var nameOverlay = document.createElement('div')
    viewer.container.appendChild(nameOverlay)
    nameOverlay.className = 'backdrop'
    nameOverlay.style.display = 'none'
    nameOverlay.style.position = 'absolute'
    nameOverlay.style.bottom = '0'
    nameOverlay.style.left = '0'
    nameOverlay.style['pointer-events'] = 'none'
    nameOverlay.style.padding = '4px'
    nameOverlay.style.backgroundColor = 'black'
    nameOverlay.style.color = 'white'
    this.nameOverlay = nameOverlay

    var leftDown = false
    var middleDown = false

    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      leftDown = true
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      leftDown = false
    }, Cesium.ScreenSpaceEventType.LEFT_UP)

    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      middleDown = true
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      middleDown = false
    }, Cesium.ScreenSpaceEventType.MIDDLE_UP)

    this.onMouseMove = (movement) => {
      this.restoreHighlight()

      if (middleDown || leftDown) {
        nameOverlay.style.display = 'none'
        return
      }

      // Pick a new feature
      var pickedFeature = viewer.scene.pick(movement.endPosition)
      if (!Cesium.defined(pickedFeature) || !Cesium.defined(pickedFeature.getProperty)) {
        nameOverlay.style.display = 'none'
        return
      }

      // A feature was picked, so show it's overlay content
      var name = pickedFeature.getProperty('gid')
      if (!Cesium.defined(name)) {
        name = pickedFeature.getProperty('id')
      }
      if (!Cesium.defined(name)) {
        name = pickedFeature.getProperty('ID')
      }
      if (name === '') {
        nameOverlay.style.display = 'none'
        return
      }

      nameOverlay.style.display = 'block'
      nameOverlay.style.bottom =
        viewer.canvas.clientHeight - movement.endPosition.y + 'px'
      nameOverlay.style.left = movement.endPosition.x + 'px'

      // nameOverlay.textContent = '水岸星城党员群众服务中心'
      nameOverlay.textContent = name

      // Highlight the feature if it's not already selected.
      if (pickedFeature !== this.selected.feature) {
        this.highlighted.feature = pickedFeature
        Cesium.Color.clone(pickedFeature.color, this.highlighted.originalColor)
        pickedFeature.color = this.colorHighlight
      }
    }

    this.onLeftClick = (movement) => {
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
      var pickedFeature = viewer.scene.pick(movement.position)
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

      this.setInfobox(pickedFeature);
    }

    this.setMouseOver(true)
    this.setMouseClick(true)
  }
}

// 若3dTiles 具有"file"属性，获取selectedEntity的描述Html
function get3dTilesHtml(pickedFeature) {
  if (
    !pickedFeature.tileset.properties ||
    !pickedFeature.tileset.properties.length
  ) {
    return false
  }

  var fileParams

  // 如果有文件名，那么依据文件名
  if (pickedFeature.hasProperty('file')) {
    var file = pickedFeature.getProperty('file')

    for (var i = 0; i < pickedFeature.tileset.properties.length; i++) {
      var params = pickedFeature.tileset.properties[i]
      if (params.file === file) {
        fileParams = params.params
      }
    }
  } else {
    fileParams = pickedFeature.tileset.properties[0].params
  }

  if (!fileParams) return false

  // 名称和 id
  var html = '<table class="cesium-infoBox-defaultTable"><tbody>'
  html +=
    '<tr><th>名称(name)</th><td>' +
    pickedFeature.getProperty('name') +
    '</td></tr>'

  html +=
    '<tr><th>楼层(LevelName)</th><td>' +
    pickedFeature.getProperty('LevelName') +
    '</td></tr>'

  html +=
    '<tr><th>分类(CategoryName)</th><td>' +
    pickedFeature.getProperty('CategoryName') +
    '</td></tr>'

  html +=
    '<tr><th>族(FamilyName)</th><td>' +
    pickedFeature.getProperty('FamilyName') +
    '</td></tr>'

  html +=
    '<tr><th>族类型(FamilySymbolName)</th><td>' +
    pickedFeature.getProperty('FamilySymbolName') +
    '</td></tr>'

  html +=
    '<tr><th>ID(id)</th><td>' + pickedFeature.getProperty('id') + '</td></tr>'

  // 依据group分类
  var groups = {}

  function getValue(value, defp) {
    if (defp.type === 'YesNo') return value === 1 ? '是' : '否'
    if (defp.type === 'Length') return (value * 0.3048).toFixed(2) + 'm'
    if (defp.type === 'Area') return (value * 0.3048 * 0.3048).toFixed(2) + '㎡'
    if (defp.type === 'Volume') {
      return (value * 0.3048 * 0.3048 * 0.3048).toFixed(2) + 'm³'
    }

    return value
  }

  function addGroup(name, value) {
    var defp

    for (let i = 0; i < fileParams.length; i++) {
      var fp = fileParams[i]
      if (name === fp.name) {
        defp = fp
        break
      }
    }
    if (!defp) return

    var rows = groups[defp.group]

    if (!rows) {
      rows = []
    }
    var row =
      '<tr><th>' +
      defp.name +
      '</th><td>' +
      getValue(value, defp) +
      '</td></tr>'
    rows.push(row)
    groups[defp.group] = rows
  }

  function groupName(group) {
    if (group === 'PG_IDENTITY_DATA') return '标识数据'
    if (group === 'PG_GEOMETRY') return '尺寸标注'
    if (group === 'PG_PHASING') return '阶段化'
    if (group === 'PG_CONSTRAINTS') return '约束'
    if (group === 'INVALID') return '其他'
    if (group === 'PG_MATERIALS') return '材质和装饰'
    if (group === 'PG_CONSTRUCTION') return '构造'

    return group
  }

  var names = pickedFeature._content.batchTable.getPropertyNames(
    pickedFeature._batchId
  )
  for (let i = 0; i < names.length; i++) {
    var n = names[i]

    addGroup(n, pickedFeature.getProperty(n))
  }

  for (const group in groups) {
    html += '<tr><th colspan="2">' + groupName(group) + '</th></tr>'

    var rows = groups[group]
    for (let i = 0; i < rows.length; i++) {
      html += rows[i]
    }
  }

  return html
}
