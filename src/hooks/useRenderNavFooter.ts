import routes from '$/router/routes';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

const useRenderNavFooter = () => {
  const [result, setResult] = useState<{
    nav: boolean;
    footer: boolean;
  }>({
    nav: true,
    footer: true,
  });
  const location = useLocation();

  useEffect(() => {
    const route_result = matchRoutes(routes, location);
    if (route_result != null) {
      setResult({
        nav: route_result[0].route.nav ?? true,
        footer: route_result[0].route.footer ?? true,
      });
    }
  }, [location]);

  return result;
};

export default useRenderNavFooter;
