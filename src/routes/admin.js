import index from "views/admin/dashboard";
import userAdmin from 'views/admin/userAdmin';
import clients from 'views/admin/clients';
import invoices from 'views/admin/invoices';

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-teal",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  }, {
    path: "/user-admin",
    name: "Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: userAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  }, {
    path: "/clients",
    name: "Clientes",
    icon: "ni ni-building text-red",
    component: clients,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 2
  }, {
    path: "/invoices",
    name: "Facturación",
    icon: "ni ni-money-coins text-green",
    component: invoices,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 2
  },
];
export default routes;
