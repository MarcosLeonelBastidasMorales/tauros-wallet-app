import React from 'react';
import styles from './HeaderBar.module.scss';

import logo from '../../../images/coinbtr_logo.png';

const HeaderBar = ({ amount }) => {
  return (
    <>
      <header className={styles.root}>
        <img src={logo} alt="logo" width="200" />
      </header>
      <div className={styles.walletWrapper}>
        <p className={styles.title}>Wallets</p>
        <div>
          <p className={styles.balance}>$ {amount}</p>
          <p className={styles.balanceInfo}>Total combinado en MXN</p>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
