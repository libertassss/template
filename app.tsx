import React, { FC, Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
interface propsType {}
const basename = process.env.NODE_ENV == 'development' ? '/' : '/home';
const App : FC<propsType> = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter basename={basename}>
                <Root/>
            </BrowserRouter>
        </Suspense>
    )
}

render(<App />, document.getElementById('root'));
if(module.hot){
    module.hot.accept() 
}
