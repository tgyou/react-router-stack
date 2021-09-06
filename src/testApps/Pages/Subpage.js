import { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { Link } from '../../react-router-stack';
import { View } from '../../react-router-stack/View';
import { useActive, useLink, usePreventBackward } from '../../react-router-stack/hooks';
import { BACKWARD } from '../../react-router-stack/constants';

import { HashData, PreventBackward } from '../Test/_Test.components';
import { Header, Footer, Section } from './HeaderFooter';

import Subsection from './Subsection';
import LoremIprum from './LoremIpsum';

export default function Subpage() {
  const active = useActive();
  const link = useLink();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const [prevent] = usePreventBackward(false);

  useEffect(() => {
    if (active && !routeMatch.key && history.direction === BACKWARD && !prevent) {
      link.goFirst('/');
    }
  }, [prevent, link, history, active, routeMatch.key]);

  return (
    <View>
      <Header>Subpage</Header>
      <Section>
        <h3>This is subpage</h3>
        <div>
          <a href="#first" onClick={event => link.goFirst(event, '/')}>
            Back to home
          </a>
        </div>
        <PreventBackward />
        <HashData />
        <div>
          <Link to="/nextpage">Nextpage</Link>
        </div>
        <div>
          <Link to="/subpage/aaa">Section A</Link>
        </div>
        <LoremIprum />
        <div>
          <Link to="/nextpage">Nextpage</Link>
        </div>
        <div>
          <Link to="/subpage/aaa">Section A</Link>
        </div>

        <Subsection />
      </Section>
      <Footer>World</Footer>
    </View>
  );
}
