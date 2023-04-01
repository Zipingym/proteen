import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';
import RealTest from '$/pages/test/Test'
import MainPage from '$/pages/main/main';

const routes: Array<Route> = [
  { path: '/', component: MainPage, footer: false },
  { path: 'main', component: MainPage },
  { path: '/test', component: RealTest },
  { path: '*', component: NotfoundPage },
];

export default routes;
