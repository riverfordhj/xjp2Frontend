/*
 * @Descripttion: test
 * @version: 1
 * @Author: KanMing
 * @Date: 2019-05-24 09:21:57
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-24 15:19:18
 */
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
        path: 'oldMen',
        name: '老年证办理',
        component: () => import('@/views/map/monomerization_cesium/index_old'),
        meta: {
          title: '老年证办理',
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
        component: () =>
          import('@/views/map/monomerization_cesium/index_party'),
        meta: {
          title: '基层党建',
          icon: 'party-building'
        }
      },
      {
        path: 'governance',
        name: '综治维稳',
        // component: () => import('@/views/map/party-building/index'),
        component: () =>
          import('@/views/map/monomerization_cesium/index_governance'),
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
			// {
			// 	path: 'company',
			// 	name: 'companyInfo',
			// 	component: () => import('@/views/population/company'),
			// 	meta: {
			// 		title: '入驻公司信息',
			// 		icon: 'dataManager' 
			// 	}
			// }
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
				path: 'company',
				name: 'CompanyInfo',
				component: () => import('@/views/buildingEconomy/company'),
				meta: {
					title: '公司信息查询',
					icon: 'table' 
				}
			},
			{
				path: 'buildingEcoTable',
				name: 'buildingEcoTable',
				component: () => import('@/views/buildingEconomy/buildingEcoTable'),
				meta: {
					title: '公司信息管理',
					icon: 'dataManager' 
				}
			},
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
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
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
    path: '/house',
    component: Layout,
    // redirect: '/example/table',
    // name: 'Example',
    // meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '房屋管理',
        component: () => import('@/views/house/index'),
        meta: {
          title: '房屋管理',
          icon: 'house'
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
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // // {
  // //   path: 'external-link',
  // //   component: Layout,
  // //   children: [
  // //     {
  // //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  // //       meta: { title: 'External Link', icon: 'link' }
  // //     }
  // //   ]
  // // },

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
