import './public-path';
import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import ReactDOM from 'react-dom';
interface propsType {}
const basename = window.__POWERED_BY_QIANKUN__ ? '/child/template' : '/';
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
  console.log('container', container);
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  console.log('已加载子应用');
  render(props);
}

export async function unmount(props: any) {
  console.log('已结束子应用');
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}

if (module.hot) {
  module.hot.accept();
}
