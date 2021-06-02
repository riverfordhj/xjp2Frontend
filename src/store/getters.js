const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
	name: state => state.user.name,
	role: state => state.user.role,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
	cesium_data: state => state.cesium_data.tileSets,
	routes: state => state.permission.routes
}
export default getters
