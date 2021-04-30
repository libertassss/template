import React, { FC } from 'react';
import './index.less';

interface homeProp {}
const Home: FC<homeProp> = (props: homeProp) => {
    return <>
        <div className="demo">hello word</div>
    </>
}

export default Home;