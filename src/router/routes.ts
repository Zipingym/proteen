import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';
import RealTest from '$/pages/test/Test'
import Ex_register from '$/pages/exercise/register/ex_register';

const routes: Array<Route> = [
  { path: '/', component: TestPage },
  { path: '/exercise/register', component: Ex_register, footer: false, nav:false },
  { path: '/test', component: RealTest },
  { path: '*', component: NotfoundPage },
];

export default routes;
