import { Fragment } from 'react';
import { Header, Section } from './HeaderFooter';

export function AsyncError({ error }: any) {
  return (
    <Fragment>
      <Header>Error</Header>
      <Section>{error.message}</Section>
    </Fragment>
  );
}

export function AsyncLoader() {
  return (
    <Fragment>
      <Header>Loading</Header>
      <Section>Now loading component, please wait a moment...</Section>
    </Fragment>
  );
}
