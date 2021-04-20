import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index2'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/admin/index'),
        meta: {
          title: '系统总览',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/map',
    component: Layout,
    // redirect: '/dashboard',
    meta: {
      title: '地图',
      icon: 'map'
    },
    children: [
      {
        path: 'person-house-map',
        name: 'PersonHouseMap',
        component: () => import('@/views/map/person-house/base-map'), // cesium-test
        meta: {
          title: '人房地图',
          icon: 'map'
        }
      },
      {
        path: 'index',
        name: '地图',
        component: () => import('@/views/map/cesium/index_9_24'), // cesium-test
        meta: {
          title: '地图',
          icon: 'map'
        }
      },
      {
        path: 'monomerization_cesium',
        name: '倾斜模型',
        component: () => import('@/views/map/monomerization_cesium/index'),
        meta: {
          title: '火灾事件',
          icon: 'map'
        }
      },
      {
        path: 'personnelDistribution',
        name: 'personnelDistribution',
        component: () => import('@/views/map/monomerization_cesium/index_old'),
        meta: {
          title: '人员位置分布',
          icon: 'map'
        }
      },
      // {
      //   path: 'extration_cesium',
      //   name: '单色模型',
      //   component: () => import('@/views/map/extration_cesium/index'),
      //   meta: {
      //     title: '单色模型',
      //     icon: 'map'
      //   }
      // },
      {
        path: 'city-management',
        name: '城市管理',
        component: () => import('@/views/map/city-management/index'),
        meta: {
          title: '城市管理',
          icon: 'city'
        }
      },
      {
        path: 'public-service',
        name: '公共服务',
        // component: () => import('@/views/map/public-service/index'),
        component: () =>
          import('@/views/map/monomerization_cesium/index_service'),
        meta: {
          title: '公共服务',
          icon: 'public-service'
        }
      },
      {
        path: 'economic-development',
        name: '经济发展',
        component: () => import('@/views/map/economic-development/index'),
        meta: {
          title: '经济发展',
          icon: 'money'
        }
      },
      {
        path: 'party-building',
        name: '基层党建',
        // component: () => import('@/views/map/party-building/index'),
        component: () => import('@/views/map/monomerization_cesium/index_party'),
        meta: {
          title: '基层党建',
          icon: 'party-building'
        }
      },
      {
        path: 'governance',
        name: '综治维稳',
        // component: () => import('@/views/map/party-building/index'),
        component: () => import('@/views/map/monomerization_cesium/index_governance'),
        meta: {
          title: '综治维稳',
          icon: 'safety'
        }
			}
    ]
  },

  {
    path: '/population',
    component: Layout,
    redirect: '/population/manage-data',
    name: '人口信息',
    meta: {
      title: '人口信息',
      icon: 'population'
    },
    children: [
      {
        path: 'manage-data',
        name: 'PersonHouseData',
        component: () => import('@/views/population/manage-data'),
        meta: {
          title: '数据管理',
          icon: 'dataManager'
        }
      },
      {
        path: 'manage-grid',
        name: '网格管理',
        component: () => import('@/views/population/manage-grid'),
        meta: {
          title: '网格管理',
          icon: 'grid'
        }
      },
      {
        path: 'inquery-population',
        name: 'PersonStatistics',
        component: () => import('@/views/population/inquery-population'),
        meta: {
          title: '统计分析',
          icon: 'search'
        }
			},
			{
        path: 'manage-personHouse',
        name: 'manage-personHouse',
        component: () => import('@/views/population/manage-personHouse'),
        meta: {
          title: '人房数据管理',
          icon: 'dataManager'
        }
			}
    ]
	},

	{
    path: '/house',
    component: Layout,
		redirect:'/house/manage-house',
    name: 'House',
    children: [
      {
        path: 'manage-house',
        name: 'manage-house',
        component: () => import('@/views/house/manage-house'),
        meta: {
          title: '房屋管理',
          icon: 'house'
        }
      }
    ]
  },
	
	{
    path: '/buildingCompany',
		component: Layout,
		redirect: '/buildingCompany/company',
		name: '楼宇经济',
    meta: { 
			title: '楼宇经济',
      icon: 'population'
	  },
    children: [
			{
				path: 'buildingInfoTable',
				name: 'buildingInfoTable',
				component: () => import('@/views/buildingEconomy/buildingInfoTable'),
				meta: {
					title: '商业体信息表',
					icon: 'table' 
				}
			},
			{
				path: 'company',
				name: 'CompanyInfo',
				component: () => import('@/views/buildingEconomy/buildingEcoTable/company'),
				meta: {
					title: '公司信息查询',
					icon: 'table' 
				}
			},
			{
				path: 'buildingEcoTable',
				name: 'buildingEcoTable',
				component: () => import('@/views/buildingEconomy/buildingEcoTable/buildingEcoTable'),
				meta: {
					title: '公司信息管理',
					icon: 'dataManager' 
				}
			},
			{
				path: 'companyTax',
				name: 'companyTax',
				component: () => import('@/views/buildingEconomy/buildingEcoTable/companyTax'),
				meta: {
					title: '公司纳税信息',
					icon: 'dataManager' 
				}
			},
			{
				path: 'buildingEco',
				name: 'buildingEcoMap',
				component: () => import('@/views/buildingEconomy/buildingEcoMap/buildingEcoMap.vue'),
				meta: {
					title: '楼宇地图',
					icon: 'map'
				}
			},
			{
				path: 'inquery-buildingEco',
				name: 'IqueryBuildingEco',
				component: () => import('@/views/buildingEconomy/inqueryBuilding/inquery-buildingEco.vue'),
				meta: {
					title: '楼宇统计分析',
					icon: 'search'
				}
			},
			{
				path: 'inqueryBuildingTax',
				name: 'inqueryBuildingTax',
				component: () => import('@/views/buildingEconomy/inqueryCompanyTax/inquery-companyTax.vue'),
				meta: {
					title: '公司税收统计分析',
					icon: 'search'
				}
			}
    ]
	},

  {
    path: '/education',
    component: Layout,
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '教育',
        component: () => import('@/views/education/index'),
        meta: {
          title: '教育',
          icon: 'education'
        }
      }
    ]
  },

  {
    path: '/public-security',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '公安',
        component: () => import('@/views/public-security/index'),
        meta: {
          title: '公安',
          icon: 'publicSecurity'
        }
      }
    ]
  },

  {
    path: '/disabled-association',
    component: Layout,
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '残联',
        component: () => import('@/views/disabled-association/index'),
        meta: {
          title: '残联',
          icon: 'disabledPerson'
        }
      }
    ]
  },

  {
    path: '/search',
    component: Layout,
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '检索查询',
        component: () => import('@/views/search/index'),
        meta: {
          title: '检索查询',
          icon: 'search'
        }
      }
    ]
  },

  {
    path: '/statistical-analysis',
    component: Layout,
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '统计分析',
        component: () => import('@/views/statistical-analysis/index'),
        meta: {
          title: '统计分析',
          icon: 'statistical'
        }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/assgin-permissions',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'systemManager'
    },
    children: [
      {
        path: 'assgin-permissions',
        name: '权限分配',
        component: () => import('@/views/system/assgin-permissions'),
        meta: {
          title: '权限分配',
          icon: 'permission'
        }
      },
      {
        path: 'change-psd',
        name: '创建用户',
        component: () => import('@/views/system/change-psd'),
        meta: {
          title: '创建用户',
          icon: 'user'
        }
      },
      {
        path: 'create-user',
        name: '修改密码',
        component: () => import('@/views/system/create-user'),
        meta: {
          title: '修改密码',
          icon: 'password'
        }
      }
    ]
  },
  
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
