import React from 'react';
import styles from './History.module.scss';

const History = ({ data }) => {
  if (data.length > 0) {
    return (
      <div className={styles.root}>
        <h3>Mis depositos y retiros</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.td}>Fecha</td>
              <td className={styles.td}>Descripción</td>
              <td className={styles.td}>Cantidad</td>
              <td className={styles.td}>Estado</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className={styles.tr} key={index}>
                <td className={styles.td}>{item.created_at}</td>
                <td className={styles.td}>
                  {item.type.toUpperCase()} {item.coin.toUpperCase()}
                </td>
                <td className={styles.td}>{item.amount}</td>
                <td className={styles.td}>
                  {item.confirmed ? 'Confirmado' : 'Pendiente'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h3>No posee transacciones</h3>;
  }
};

export default History;
