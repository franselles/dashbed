export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dash',
    name: 'dash',
    component: () => import('@/views/Dash.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/citybeaches',
        name: 'citybeaches',
        component: () => import('@/views/Citybeaches.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/sector',
        name: 'sector',
        component: () => import('@/views/Sector.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/Editor.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/createitems',
        name: 'createitems',
        component: () => import('@/views/Createitems.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/cartsuser',
        name: 'cartsuser',
        component: () => import('@/views/Cartsuser.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/create',
        name: 'create',
        component: () => import('@/views/Createitems.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
