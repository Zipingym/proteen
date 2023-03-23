import FooterComponent from '$/components/footer/footer';
import NavComponent from '$/components/nav/nav';
import useCurrentPath from '$/hooks/useRenderNavFooter';
import * as S from './router.style';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const CustomRouter = () => {
  const currentPath = useCurrentPath();
  return (
    <S.MainPageWrapper>
      {currentPath.nav ? <NavComponent /> : null}
      <S.RouterWrapper>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                path={route.path}
                element={<route.component />}
                key={idx}
              />
            );
          })}
        </Routes>
      </S.RouterWrapper>
      {currentPath.footer ? <FooterComponent /> : null}
    </S.MainPageWrapper>
  );
};

export default CustomRouter;
