import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border-radius: 8px;
  border: 1px solid #888;
  background-color: #ddd;
  position: sticky;
  top: 8px;
  margin-bottom: 10px;

  section {
    display: flex;
  }

  section + section {
    margin-top: 10px;
  }

  dl {
    flex: 1 0 auto;
    width: 50%;
  }

  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
  }

  dt {
    font-weight: bold;
  }
`;

const jsonStringifyFn = (k, v) => (v === undefined ? 'undefined' : v);

export function Meta() {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fieldset>
      <section>
        <dl>
          <dt>location.state.__key</dt>
          <dd>{location.state?.__key ? JSON.stringify(location.state.__key, jsonStringifyFn, ' ') : 'undefined'} </dd>
        </dl>
        <dl>
          <dt>location.key</dt>
          <dd>{location.key}</dd>
        </dl>
      </section>
      <section>
        <dl>
          <dt>history.action:</dt>
          <dd>{history.action}</dd>
        </dl>
        <dl>
          <dt>history.direction:</dt>
          <dd>{history.direction || 'null'}</dd>
        </dl>
      </section>
      <section>
        <dl>
          <dt>location.state: </dt>
          <dd>
            {location.state
              ? JSON.stringify(location.state, jsonStringifyFn, ' ').replace(/"undefined"/g, 'undefined')
              : 'null'}
          </dd>
        </dl>
      </section>
    </Fieldset>
  );
}
