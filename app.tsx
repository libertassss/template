import './src/public-path';
import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import ReactDOM from 'react-dom';
interface propsType {}
const basename =
  process.env.NODE_ENV == 'development'
    ? '/'
    : window.__POWERED_BY_QIANKUN__
    ? '/app-react'
    : '/';
const App: FC<propsType> = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename={basename}>
        <Root />
      </BrowserRouter>
    </Suspense>
  );
};

function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
  if (module.hot) {
    module.hot.accept();
  }
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}
