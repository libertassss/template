import React, { FC } from 'react';
import './index.less';
import Test from '../test';

interface homeProp {}
const Home: FC<homeProp> = (props: homeProp) => {
    return <>
        <div className="demo">hello word11133222</div>
        <Test/>
    </>
}

export default Home;