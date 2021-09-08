import { CSSTransition } from 'react-transition-group';
import { useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { Link, StackRoute, StackSwitch } from 'react-router-stack';
import { View, BTT } from 'react-router-stack/View';

import { Header, Section } from './HeaderFooter';

const SubsectionElement = styled.div`
  margin-top: 10px;
  transform: translate3d(0px, 0px, 0px);
  width: calc(100% + 30px);
  height: ${props => (props.$isActive ? 300 : 0)}px;
  margin: 0px -15px;

  &.enter,
  &.exit {
    display: block;
    will-change: auto;
    pointer-events: none;
  }
  &.enter-active,
  &.exit-active {
    overflow: hidden;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-duration: ${props => props.$duration}ms;
    transition-delay: ${props => props.$delay}ms;
  }

  &.enter {
    height: 0;
    &-active {
      height: 300px;
    }
  }
  &.exit {
    height: 300px;
    &-active,
    &-done {
      height: 0;
    }
  }
`;

export default function Subsection() {
  const routeMatch = useRouteMatch();

  return (
    <CSSTransition in={!routeMatch.isExact} unmountOnExit={false} timeout={450}>
      <SubsectionElement $duration={400} $delay={50} $isActive={!routeMatch.isExact}>
        <StackSwitch unmountOnExit={false} duration={400} delay={50}>
          <StackRoute exact path="/subpage/aaa" component={SubpageSectionA} />
          <StackRoute exact path="/subpage/bbb" component={SubpageSectionB} />
        </StackSwitch>
      </SubsectionElement>
    </CSSTransition>
  );
}

function SubpageSectionA() {
  return (
    <View type={BTT}>
      <Header>Section A</Header>
      <Section>
        <h3>This is subpage</h3>
        <div>
          <Link to="/subpage/bbb">/subpage/bbb</Link>
        </div>
        <div>
          <Link to="/subpage/aaa">/subpage/aaa</Link>
        </div>
      </Section>
    </View>
  );
}

function SubpageSectionB() {
  return (
    <View type={BTT}>
      <Header>Section B</Header>
      <Section>
        <div>
          <Link to="/subpage/aaa">/subpage/aaa</Link>
        </div>
        <div>
          <Link to="/subpage/bbb">/subpage/bbb</Link>
        </div>
      </Section>
    </View>
  );
}
