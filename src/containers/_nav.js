export default [

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Ejemplos',
  //   icon: 'cil-address-book',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Nuevo',
  //       to: '/ejemplos/nuevo',
  //     }, {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Nuevo sin formik',
  //       to: '/ejemplos/nuevoSinFormik',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tabla + CRUD',
  //       to: '/servicios',
  //     },
  //   ]
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cotiza tu crédito',
    to: '/cotizacion',
    className:'bg-secondary'
    // icon: 'cil-account-logout',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Productos solicitados',
    to: '/resumen',
    // icon: 'cil-account-logout',
   
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cerrar sesión',
    to: '/',
    icon: 'cil-account-logout',
    onClick: () => {
      localStorage.clear();
    }
  },


]
