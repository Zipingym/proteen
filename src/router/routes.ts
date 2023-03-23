import Route from './routes.d';

import NotfoundPage from '$/pages/notfound/notfound';
import TestPage from '$/pages/test/App';

const routes: Array<Route> = [
  { path: '*', component: NotfoundPage },
  { path: '/', component: TestPage },
];

export default routes;
