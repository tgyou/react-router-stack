import { Link } from 'react-router-stack';
import { View } from 'react-router-stack/View';
import { useLink, useRouteLocation } from 'react-router-stack/hooks';

import { Header, Footer, Section } from './HeaderFooter';
import LoremIprum from './LoremIpsum';
import { useLocation } from 'react-router';

export default function Home() {
  const link = useLink();
  const location = useLocation();
  const activeLocation = useRouteLocation();

  return (
    <View>
      <Header>Hello</Header>
      <Section>
        <h3>This is content area</h3>
        <div>{location.pathname}</div>
        <div>{activeLocation.pathname}</div>
        <div>
          <a href="#first" onClick={event => link.goFirst(event, '/')}>
            Back to home
          </a>
        </div>
        <div>
          <Link to="/" reuse={false}>
            /
          </Link>
        </div>
        <div>
          <Link to="/subpage">/subpage</Link>
        </div>
        <div>
          <Link to="/subpage/aaa">/subpage/aaa</Link>
        </div>
        <LoremIprum />
        <div>
          <Link to="/subpage">/subpage</Link>
        </div>
      </Section>
      <Footer>World</Footer>
    </View>
  );
}
