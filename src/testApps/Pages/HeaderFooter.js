import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { useRouteLocation } from '../../react-router-stack/hooks';

export const TestViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderComponent = styled.header`
  position: sticky;
  font-size: 20px;
  font-weight: bold;
  padding: calc(env(safe-area-inset-top) + 10px) 15px 10px 15px;
  top: 0;
  background: #eee;
`;

export const Header = (props: any) => {
  const location = useRouteLocation();
  const routeMatch = useRouteMatch();
  const [top, setTop] = useState(document.documentElement.scrollTop);

  // for ios focus on input,textarea element. (popup keyboard)
  useEffect(() => {
    const callback = () => {
      if (top === document.documentElement.scrollTop) return;
      setTop(document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [top]);

  return (
    <HeaderComponent {...props} style={{ top }}>
      {props.children} {location.key} / {routeMatch.key}
    </HeaderComponent>
  );
};

export const FooterComponent = styled.footer`
  width: 100%;
  position: sticky;
  font-size: 20px;
  padding: 10px 15px calc(env(safe-area-inset-top) + 10px) 15px;
  box-sizing: border-box;
  bottom: 0;
  background: #eee;
`;

export const Footer = (props: any) => {
  const [top, setTop] = useState(document.documentElement.scrollTop);

  // for ios focus on input,textarea element. (popup keyboard)
  useEffect(() => {
    const callback = () => {
      if (top === document.documentElement.scrollTop) return;
      setTop(document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [top]);

  return <FooterComponent {...props} />;
};

export const Section = styled.section`
  ${TestViewLayout} > & {
    flex: 1 0 auto;
  }
  padding: 10px 15px;
`;
