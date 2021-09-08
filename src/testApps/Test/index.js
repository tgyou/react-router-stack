import { useRouteMatch } from 'react-router';

import { Link, StackRoute, StackRouter, StackSwitch } from 'react-router-stack';

import { Meta } from './_Meta';
import { FieldsetPage, Header, Links } from './_Test.components';
import './index.css';

export const Home = props => {
  return (
    <FieldsetPage>
      <Header>Home</Header>
      <Links />
    </FieldsetPage>
  );
};

export const Aaa = props => {
  return (
    <FieldsetPage>
      <Header>Aaa</Header>
      <Links />
    </FieldsetPage>
  );
};

export const Bbb = () => {
  return (
    <FieldsetPage>
      <Header>Bbb</Header>
      <Links />
    </FieldsetPage>
  );
};

export const Ccc = () => {
  return (
    <FieldsetPage>
      <Header>Ccc</Header>
      <Links />
    </FieldsetPage>
  );
};

export const Ddd = () => {
  return (
    <FieldsetPage>
      <Header>Ddd</Header>
      <Links />
      <StackSwitch unmountOnExit={false}>
        <StackRoute path="/ddd/daa" component={DddDaa} />
        <StackRoute path="/ddd/dbb" component={DddDbb} />
        <StackRoute path="/ddd/dcc" component={DddDcc} />
      </StackSwitch>
    </FieldsetPage>
  );
};

export const DddDaa = () => {
  return (
    <FieldsetPage>
      <Header>DaaDaa</Header>
      <div>
        <Link to="/ddd/daa">/ddd/daa</Link>&nbsp;
        <Link to="/ddd/dbb">/ddd/dbb</Link>&nbsp;
        <Link to="/ddd/dcc">/ddd/dcc</Link>&nbsp;
      </div>
    </FieldsetPage>
  );
};

export const DddDbb = () => {
  return (
    <FieldsetPage>
      <Header>DddDbb</Header>
      <div>
        <Link to="/ddd/daa">/ddd/daa</Link>&nbsp;
        <Link to="/ddd/dbb">/ddd/dbb</Link>&nbsp;
        <Link to="/ddd/dcc">/ddd/dcc</Link>&nbsp;
      </div>
    </FieldsetPage>
  );
};

export const DddDcc = () => {
  return (
    <FieldsetPage>
      <Header>DddDcc</Header>
      <div>
        <Link to="/ddd/daa">/ddd/daa</Link>&nbsp;
        <Link to="/ddd/dbb">/ddd/dbb</Link>&nbsp;
        <Link to="/ddd/dcc">/ddd/dcc</Link>&nbsp;
      </div>
      <div>
        <Link to="/ddd/dcc/aaa">/ddd/dcc/aaa</Link>&nbsp;
        <Link to="/ddd/dcc/bbb">/ddd/dcc/bbb</Link>&nbsp;
        <Link to="/ddd/dcc/ccc">/ddd/dcc/ccc</Link>&nbsp;
      </div>
      <StackSwitch unmountOnExit={false}>
        <StackRoute exact path="/ddd/dcc/aaa" component={DddDccAaa} />
        <StackRoute exact path="/ddd/dcc/bbb" component={DddDccBbb} />
        <StackRoute exact path="/ddd/dcc/ccc" component={DddDccCcc} />
      </StackSwitch>
    </FieldsetPage>
  );
};

export const DddDccAaa = () => {
  return (
    <FieldsetPage>
      <Header>DddDccAaa</Header>
      <div>
        <Link to="/ddd/dcc/aaa">/ddd/dcc/aaa</Link>&nbsp;
        <Link to="/ddd/dcc/bbb">/ddd/dcc/bbb</Link>&nbsp;
        <Link to="/ddd/dcc/ccc">/ddd/dcc/ccc</Link>&nbsp;
      </div>
    </FieldsetPage>
  );
};

export const DddDccBbb = () => {
  return (
    <FieldsetPage>
      <Header>DddDccBbb</Header>
      <div>
        <Link to="/ddd/dcc/aaa">/ddd/dcc/aaa</Link>&nbsp;
        <Link to="/ddd/dcc/bbb">/ddd/dcc/bbb</Link>&nbsp;
        <Link to="/ddd/dcc/ccc">/ddd/dcc/ccc</Link>&nbsp;
      </div>
    </FieldsetPage>
  );
};

export const DddDccCcc = () => {
  return (
    <FieldsetPage>
      <Header>DddDccCcc</Header>
      <div>
        <Link to="/ddd/dcc/aaa">/ddd/dcc/aaa</Link>&nbsp;
        <Link to="/ddd/dcc/bbb">/ddd/dcc/bbb</Link>&nbsp;
        <Link to="/ddd/dcc/ccc">/ddd/dcc/ccc</Link>&nbsp;
      </div>
    </FieldsetPage>
  );
};

export const Zzz = () => {
  const routeMatch = useRouteMatch();

  return (
    <FieldsetPage>
      <Header>Not found</Header>
      <div>url not found : {routeMatch.url}</div>
      <Links />
    </FieldsetPage>
  );
};

function TestApp() {
  return (
    <StackRouter>
      <Meta />
      <StackSwitch unmountOnExit={false}>
        <StackRoute exact path="/" component={Home} />
        <StackRoute exact path="/aaa" component={Aaa} />
        <StackRoute exact path="/bbb" component={Bbb} />
        <StackRoute exact path="/ccc">
          {() => <Ccc />}
        </StackRoute>
        <StackRoute path="/ddd" component={Ddd} />
        <StackRoute render={() => <Zzz />} />
      </StackSwitch>
    </StackRouter>
  );
}

export default TestApp;
