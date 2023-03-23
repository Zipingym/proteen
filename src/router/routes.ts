import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';
import RealTest from '$/pages/test/Test'

const routes: Array<Route> = [
  { path: '/', component: TestPage },
  { path: '/test', component: RealTest },
  { path: '*', component: NotfoundPage },
];

export default routes;
