import React, { FC } from 'react';
import styles from './index.less';

interface TestProps {}
const Test: FC<TestProps> = () => {
  return <div className={styles['test']}>Test</div>;
};

export default Test;
