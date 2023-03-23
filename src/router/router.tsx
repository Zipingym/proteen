import FooterComponent from '$/components/footer/footer';
import NavComponent from '$/components/nav/nav';
import useCurrentPath from '$/hooks/useRenderNavFooter';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const CustomRouter = () => {
  const currentPath = useCurrentPath();
  return (
    <div>
      {currentPath.nav ? <NavComponent /> : null}
      <Routes>
        {routes.map((route, idx) => {
          return (
            <Route path={route.path} element={<route.component />} key={idx} />
          );
        })}
      </Routes>
      {currentPath.footer ? <FooterComponent /> : null}
    </div>
  );
};

export default CustomRouter;
