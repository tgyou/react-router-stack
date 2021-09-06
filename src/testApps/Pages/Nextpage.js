import { Link } from '../../react-router-stack';
import { useLink } from '../../react-router-stack/hooks';

import { Header, Footer, Section } from './HeaderFooter';
import LoremIprum from './LoremIpsum';
import { Fragment } from 'react';

export default function Nextpage() {
  const link = useLink();

  return (
    <Fragment>
      <Header>Next Page</Header>
      <Section>
        <h3>This is content area</h3>
        <div>
          <a href="#first" onClick={event => link.goFirst(event, '/')}>
            Back to home
          </a>
        </div>
        <LoremIprum />
        <div>
          <Link to="/">/</Link>
        </div>
      </Section>
      <Footer>World</Footer>
    </Fragment>
  );
}
