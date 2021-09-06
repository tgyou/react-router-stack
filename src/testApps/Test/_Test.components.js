import { forwardRef, Fragment, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import { __RouterContext } from 'react-router';

import { Link } from '../../react-router-stack';
import { useActive, useHashData, usePreventBackward } from '../../react-router-stack/hooks';

import { getRandomFruit } from './_Test.utils';

export const Fieldset = styled.fieldset`
  border-radius: 8px;
  border: 1px solid #888;
  line-height: 150%;
`;

const FieldsetPageElement = styled(Fieldset)`
  &:not(.active) {
    pointer-events: none;
    filter: blur(1px) grayscale(1);
    opacity: 0.45;
  }

  &.active {
    opacity: 1;
    pointer-events: initial;
  }

  & + & {
    margin-top: 10px;
  }

  legend {
    padding: 0 5px;
    font-weight: bold;
  }

  legend strong {
    display: inline-block;
    border: 1px solid rgb(110, 157, 36);
    background-color: rgb(120, 167, 46);
    color: #fff;
    border-radius: 4px;
    padding: 0 5px;
    margin-right: 4px;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: normal;
  }
`;

export const FieldsetPage = forwardRef((props, ref) => {
  const active = useActive();

  return <FieldsetPageElement ref={ref} {...props} className={active ? 'active' : ''} />;
});

export const PreventBackward = () => {
  const [prevent, setPrevent, { key, hasNext, isNext }] = usePreventBackward();

  const setFunction = useCallback(
    event => {
      setPrevent(() => {
        return window
          .Confirm(
            <div>
              Do you want to go back?
              <br />
              Press OK to unset the value.
              <br />
              {key}
            </div>
          )
          .then(res => {
            if (res) {
              setPrevent(false);
            }

            return res;
          });
      });
    },
    [key, setPrevent]
  );

  const setBoolean = useCallback(
    event => {
      setPrevent(true);
    },
    [setPrevent]
  );

  const unset = useCallback(
    event => {
      setPrevent(false);
    },
    [setPrevent]
  );

  return (
    <Fieldset style={{ marginBottom: 10 }}>
      <legend>prevent backward</legend>
      <div>key: {key}</div>
      <div>
        value:{' '}
        {typeof prevent === 'function'
          ? 'function'
          : typeof prevent === 'boolean'
          ? prevent.toString()
          : prevent || 'undefined'}
      </div>
      <div>hasNext: {hasNext ? 'true' : 'false'}</div>
      <div>isNext: {isNext ? 'true' : 'false'}</div>
      {!prevent ? (
        <div>
          <button onClick={setFunction}>Set function</button>
          <button onClick={setBoolean}>Set true</button>
        </div>
      ) : (
        <div>
          <button onClick={unset}>Unset</button>
        </div>
      )}
    </Fieldset>
  );
};

export const HashData = () => {
  const hashData = useHashData();
  const value = useMemo(() => getRandomFruit(), []);

  return (
    <Fieldset style={{ marginBottom: 10 }}>
      <legend>hash data</legend>
      <div>hash: {JSON.stringify(hashData)}</div>
      <div>
        <a href={`#key=${value}`}>#key={value}</a>
      </div>
    </Fieldset>
  );
};

export const Header = ({ children }) => {
  const active = useActive();
  const routerContext = useContext(__RouterContext);
  const routeMatch = useRouteMatch();

  return (
    <Fragment>
      <legend>
        {children} ({routeMatch.key || 'undefined'} / depth: {routerContext.routerIndex}){' '}
        {active ? <strong>active</strong> : null}
        {active && routeMatch.isExact ? <strong>exact</strong> : null}
      </legend>
      <PreventBackward />
      <HashData />
    </Fragment>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export const Links = () => {
  return (
    <Fragment>
      <div>
        <Link to="/?query=value">/?query=value</Link>&nbsp;
        <Link to="/?query=value" reuse={false}>
          /?query=value (!reuse)
        </Link>
      </div>
      <div>
        <Link to="/aaa">/aaa</Link>
      </div>
      <div>
        <Link to="/bbb">/bbb</Link>&nbsp;
        <Link to="/bbb" reuse={false}>
          /bbb (!reuse)
        </Link>
      </div>
      <div>
        <Link to="/ccc">/ccc</Link>&nbsp;
        <Link to="/ccc" replace>
          /ccc (replace)
        </Link>
        &nbsp;
        <Link to="/ccc" replace reuse={false}>
          /ccc (replace,!reuse)
        </Link>
      </div>
      <div>
        <Link to="/ddd">/ddd</Link>
      </div>
      <div>
        <Link to="/ddd/daa">/ddd/daa</Link>
        &nbsp;
        <Link to="/ddd/dbb">/ddd/dbb</Link>
        &nbsp;
        <Link to="/ddd/dcc">/ddd/dcc</Link>
        &nbsp;
      </div>
      <div>
        <Link to="/zzz">/zzz</Link>
      </div>
      <div>
        <Link to="/">/&lt;root&gt;</Link>&nbsp;
        <Link to="/" reuse={false}>
          &lt;root&gt; (!reuse)
        </Link>
        &nbsp;
        <Link to="/" replace reuse={false}>
          /&lt;root&gt; (replace,!reuse)
        </Link>
      </div>
    </Fragment>
  );
};
