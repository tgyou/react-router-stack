# React Router Stack

for all web apps become like native apps... 

## Install

npm package... (soon)
```sh
yarn add react-router-stack
```

git source
```sh
git clone https://git...
yarn
yarn start
```

## Basic Usage
```jsx
// App.js
export default function App() {
  return (
  <StackRouter>
    <StackSwitch unmountOnExit={false} duration={400} delay={100}>
      <StackRoute exact route="/" component={Home} />
      <StackRoute route="/subpage" component={Subpage} />
      <StackRoute exact route="/nextpage" component={Nextpage} unmountOnExit={true} />
      <StackRoute component={NotFound} unmountOnExit={true} />
    </StackSwitch>
  </StackRouter>
  );
}
```

```jsx
// Home.js
export default function Home() {
  return (
    <View>
      Hello, this is home
    </View>
  );
}
```

## Components
```js
import { ... } from 'react-router-stack';
```

### &lt;StackRouter&gt;
#### props
- no props
> We have not tested in SSR environment, so we expect an update later.

### &lt;StackSwitch&gt;

#### usage

```jsx
// basic (same as react-router)
<StackSwitch>
...
</StackSwitch>

// Maintain the mount of past history stacks.
<StackSwitch unmountOnExit={false}>
  ...
</StackSwitch>

// props for animation
<StackSwitch duration={400} delay={500}>
  ...
</StackSwitch>

// also, it can be used instead of timeout.
<StackSwitch timeout={500}>
  ...
</StackSwitch>
```

#### props
- `delay: <number>` (optional)
- `duration: <number>` (optional)
- `timeout: <number>` (optional)
- `unmountOnExit: <boolean>` (default: `true`) (optional)
- `children: <StackRoute[]>`
> All props can also be defined in `<StackRoute>`., except `children`

### &lt;StackRoute&gt;
#### props
- `path: <string | string[]>`
- `exact: <boolean>` (default: `false`) (optional)
- `component: <ReactChild>`
- `render: <ReactChild | function>` (optional)
- `children: <ReactChild | function>` (optional)
- `delay: <number>` (optional)
- `duration: <number>` (optional)
- `timeout: <number>` (optional)
- `unmountOnExit: <boolean>` (default: `true`)

### &lt;Link&gt;
```js
import { Link } from 'react-router-stack';
```

#### usage
```jsx
// push
<Link to="/subpage">Link to Subpage</Link>

// replace
<Link to="/subpage" replace>Replace to Subpage</Link>

// Updates occur in the same view if the routes currently visible and the destination have the same routes.
// which can be resolved by reuse={false} prop if you want to add a new stack.
<Link to="/subpage" reuse={false}>Replace to Subpage</Link>
```

#### props
- `to: <string | function | toProps>`
- `as: <string>` (default: `a`) (optional) TagName
- `replace: <boolean>` (default: `false`) (optional)
- `reuse: <boolean>` (default: `true`) (optional)
- `action: <string>(POP | PUSH | REPLACE)` (optional)
- `direction: <string>(FORWARD | BACKWARD)` (optional)
- `viewType: <string>(RTL | LTR | BTT | TTB | ... animation className)` (optional)



### &lt;View&gt;
```js
import { View } from 'react-router-stack/View';
```

#### usage 
```jsx
// basic usage
<View>
  Content Here
</View>

// You can also define props
<View component={View} viewType={RTL}>
  Content Here
</View>
```

#### props
- `component: <ReactChild>` (default: `View`) (optional)
- `viewType: <string>(RTL | LTR | BTT | TTB | ... animation className)` (optional)



If you want to permanently change the component,
```jsx
import { viewConfig, ViewComponentSpring } from 'react-router-stack/View';

viewConfig.component = ViewComponentSpring;
```
----

## Hooks
```js
import { ... } from 'react-router-stack/hooks';
```

### useActive()
- Returns the activation state.
```js
import { link } from 'react-router-stack/hooks';

const active = useActive();
```

### useRouteLocation()
- Same as useLocation. However, it only returns the location of the active state.
```js
import { link } from 'react-router-stack/hooks';

...

const location = useRouteLocation();
```
### useLink()
```js
import { link } from 'react-router-stack/hooks';

...

const link = useLink();
```

- push(to, state, options)
```js
import { link } from 'react-router-stack/hooks';

...

const handleLink = useCallback(() => {
  link.push('/subpage', null, {
    reuse: false,
  });
}, [link]);
```
- replace(to, state, options)
```js
import { link } from 'react-router-stack/hooks';

...

const handleReplaceLink = useCallback(() => {
  link.replace('/subpage', null, {
    reuse: false,
  });
}, [link]);
```

- goFirst(event or fallbackUrl, fallbackUrl)
```js
import { link } from 'react-router-stack/hooks';

...

const handleGoFirst = useCallback((event) => {
  // link.goFirst(fallbackUrl);
  link.goFirst();

  // or you can alse define fallback replace url.
  link.goFirst('/');

  // or If you want to event.preventDefault, it can be used as follows:
  link.goFirst(event, '/');
  // eg: <a href="#home" onClick={link.goFirst}>
}, [link]);
```

- goBackView()
```js
import { link } from 'react-router-stack/hooks';

...

const handleGoBackView = useCallback((event) => {
  link.goBackView();
}, [link]);
```

### useHashData()
```js
import { useHashData } from 'react-router-stack/hooks';

...

const hashData = useHashData();

useEffect(() => {
  console.log(hashData);
}, [hashData]);
```

### usePreventBackward(true | false)

#### Basic usage
```js
import { usePreventBackward } from 'react-router-stack/hooks';

...

const [prevent, setPrevent] = usePreventBackward();
```

#### without event listener
```js
import { usePreventBackward } from 'react-router-stack/hooks';

...

const [prevent, setPrevent] = usePreventBackward(false);
```
### usePremount()
```js
import { premount } from 'react-router-stack/hooks';

...

const premount = usePremount();
premount();
```
----
## asyncComponent

```jsx
// App.js
const Nextpage = asyncViewComponent({
  resolve: () => import('./Nextpage'),
  componentProps: { type: BTT }, // View Props, (optional)
  LoadingComponent: () => <Fragment>Loading...</Fragment>,
  ErrorComponent: ({ error }) => <Fragment>{error.message}</Fragment>,
});
```

If you want to permanently change the component,
```jsx
asyncViewComponent.LoadingComponent = () => <Fragment>Loading...</Fragment>;
asyncViewComponent.ErrorComponent = ({ error }) => <Fragment>{error.message}</Fragment>;

const Nextpage = asyncViewComponent({
  resolve: () => import('./Nextpage'),
  componentProps: { type: BTT }, // View Props, (optional)
});
```

`asyncViewComponent` includes `View`.  
`View` must be excluded from isolated component.  
If you need to specify props in View. Use componentProps instead.

```jsx
// Nextview.js 

// Before
export function Nextview() {
  return (
    <View viewType={BTT}> {/* <--- HERE */}
      Content
    </View>
  );
}

// After
export function Nextview() {
  return (
    <React.Fragment>
      Content
    </React.Fragment>
  );
}
```

```jsx
// App.js
const Nextpage = asyncViewComponent({
  resolve: () => import('./Nextpage'),
  componentProps: { type: BTT }, // <--- HERE
});
```
