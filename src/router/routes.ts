import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';
import RealTest from '$/pages/test/Test';
import Ex_register from '$/pages/exercise/register/ex_register';
import Ex_bulletin from '$/pages/exercise/bulletin/ex_bulletin';
import signup from '$/components/signup/signup';
import signin from '$/components/signin/signin';
import MainPage from '$/pages/main/main';
import mypage from '$/components/mypage/mypage';

const routes: Array<Route> = [
  { path: '/', component: MainPage, footer: false },
  { path: '/main', component: MainPage, footer: false },
  {
    path: '/exercise/register',
    component: Ex_register,
    footer: false,
    nav: false,
  },
  {
    path: '/exercise/bulletin',
    component: Ex_bulletin,
    footer: false,
    nav: false,
  },
  { path: '/test', component: RealTest },
  { path: '*', component: NotfoundPage },
  { path: '/signup', component: signup, nav: false, footer: false },
  { path: '/signin', component: signin, nav: false, footer: false },
  { path: '/mypage', component: mypage, nav: false, footer: false},
];

export default routes;
