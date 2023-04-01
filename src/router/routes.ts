import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';
import RealTest from '$/pages/test/Test';
import signup from '$/components/signup/signup';
import signin from '$/components/signin/signin';
import MainPage from '$/pages/main/main';

const routes: Array<Route> = [
  { path: '/', component: MainPage, footer: false },
  { path: 'main', component: MainPage },
  { path: '/test', component: RealTest },
  { path: '*', component: NotfoundPage },
  { path: '/signup', component: signup, nav: false, footer: false },
  { path: '/signin', component: signin, nav: false, footer: false },
];

export default routes;
