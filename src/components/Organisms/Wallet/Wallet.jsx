import React from 'react';
import styles from './Wallet.module.scss';

const Wallet = ({ img, name, tag, balance, price, selected, onClick }) => {
  return (
    <div
      className={selected ? styles.rootSelected : styles.root}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <img src={img} alt="avatar" className={styles.avatar} />
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
            <p className={styles.name}>
              <span className={styles.tag}>{tag}</span>
            </p>
          </div>
        </div>
        <div>
          <p className={styles.balance}>{balance}</p>
          <p className={styles.price}>$ {price ? price : balance} MXN</p>
        </div>
      </div>
      {selected && (
        <div className={styles.actions}>
          <button className={styles.button}>Fondear</button>
          <button className={styles.button}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default Wallet;
