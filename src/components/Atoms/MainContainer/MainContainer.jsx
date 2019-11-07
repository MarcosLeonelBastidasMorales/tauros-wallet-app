import React from 'react';
import styles from './MainContainer.module.scss';

const MainContainer = ({ children, style }) => {
  return <main style={style} className={styles.root}>{children}</main>;
};

export default MainContainer;
