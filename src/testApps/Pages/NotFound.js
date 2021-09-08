import { useRouteMatch } from 'react-router';

import { View } from 'react-router-stack/View';
import { useLink } from 'react-router-stack/hooks';

import { Header, Section } from './HeaderFooter';

export default function NotFound() {
  const link = useLink();
  const routeMatch = useRouteMatch();

  return (
    <View>
      <Header>Not Found</Header>
      <Section>
        <h3>{routeMatch.url}</h3>
        <div>
          <a href="#first" onClick={event => link.goFirst(event, '/')}>
            Back to home
          </a>
        </div>
      </Section>
    </View>
  );
}
