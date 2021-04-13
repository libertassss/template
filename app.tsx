import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
interface propsType {}
const basename = process.env.NODE_ENV == 'development' ? '/' : '/';
const App : FC<propsType> = () => {
    return (
        <BrowserRouter basename={basename}>
            <Root/>
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('root'));