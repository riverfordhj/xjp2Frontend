import {asyncRoutes, constantRoutes} from '@/router/index.js';

function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role);
  } else {
    return true
  }
}

//过滤asyncRoutes路由表
function filterAsyncRoutes(asyncRoutes, role){
	let res = [];
	asyncRoutes.forEach(route => {
		const resRoute = { ...route };
		if(hasPermission(role, route)){
			if(route.children){
				resRoute.children = filterAsyncRoutes(route.children, role);
			}
			res.push(resRoute);
		}
	});

	return res;
}

const state = {
	routes: []
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.routes = constantRoutes.concat(routes);
	}
}

const actions = {
	generateRoutes({ commit }, role){
		return new Promise(resolve => {
			let accessedRoutes;
			if(role === 'Administrator'){
				accessedRoutes = asyncRoutes;
			}else{
				accessedRoutes = filterAsyncRoutes(asyncRoutes, role);
			}
   
			commit('SET_ROUTES', accessedRoutes);
			resolve(accessedRoutes);
		});
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}