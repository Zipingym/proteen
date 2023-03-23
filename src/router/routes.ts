import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';

const routes: Array<Route> = [
  { path: '/', component: TestPage },
  { path: '/test', component: TestPage },
  { path: '*', component: NotfoundPage },
];

export default routes;
