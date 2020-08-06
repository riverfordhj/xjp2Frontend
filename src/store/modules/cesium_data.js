const cesium_data = {
  state: {
    tileSets: null
  },

  mutations: {
    ADD_CESIUM_DATA: (state, resource) => {
      state.tileSets = resource
      console.log('倾斜摄影加载完成', state.tileSets)

      // let val = state.data.get(resource.key) || []
      // let a = new Set(val)
      // let b = new Set(resource.value)
      // let unionSet = new Set([...a,...b])
      // if (arrayEquals(Array.from(unionSet), val)) {
      //   return
      // }
      // let data = state.data.set(resource.key,Array.from(unionSet))
      // state.data = new Map(data)
    },
    REMOVE_CESIUM_DATA: (state, name) => {
      // state.data.delete(name)
      // state.data = new Map(state.data)
      //   deleteItem(state.esri_resources,resource,"serverAddress");
      // },
    },
    GET_CESIUM_DATA: state => {
      return state.tileSets
    }
  },

  actions: {
    AddCesiumData({ commit }, resource) {
      // debugger
      commit('ADD_CESIUM_DATA', resource)
    },
    RemoveCesiumData({ commit }, name) {
      commit('REMOVE_CESIUM_DATA', name)
    }
    // GetCesiumData({ commit }) {
    //   commit('GET_CESIUM_DATA')
    // }
  }
}

export default cesium_data
