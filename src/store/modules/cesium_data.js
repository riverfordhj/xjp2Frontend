const cesium_data = {
  state: {
    tileSets: null
  },

  mutations: {
    ADD_CESIUM_DATA: (state, resource) => {
      state.tileSets = resource
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
      commit('ADD_CESIUM_DATA', resource)
    },
    RemoveCesiumData({ commit }, name) {
      commit('REMOVE_CESIUM_DATA', name)
    }
  }
}

export default cesium_data
