import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Actions
import { getWallets, getWalletsPrice } from '../../store/wallets/actions';

// Atoms
import { MainContainer } from '../../components/Atoms';

// Organisms
import { HeaderBar, Wallet, History } from '../../components/Organisms';

const Wallets = ({ state, actions }) => {
  const [selectedWallet, setWallet] = useState('');
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState(0);
  const { token, coins, prices } = state;
  let { wallets } = state;

  const handleSelectWallet = coin => () => {
    setWallet(coin);
  };

  useEffect(() => {
    if (wallets.length > 0) {
      let total = 0;
      Object.keys(prices).forEach(item => {
        total += prices[item].MXN.PRICE;
      });

      const findMXN = wallets.find(item => item.coin === 'MXN');

      total += Number(findMXN.balance);
      setAmount(total);
    }
  }, [wallets, prices]);

  useEffect(() => {
    actions.getWallets(token);
  }, []);

  useEffect(() => {
    if (coins) {
      actions.getWalletsPrice(coins);
    }
  }, [coins]);

  useEffect(() => {
    if (selectedWallet !== '') {
      const getHistory = async () => {
        const url = `https://api.staging.tauros.io/api/v1/data/transfershistory/?coin=${selectedWallet.toLowerCase()}&type=deposits`;

        const options = {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          }),
        };

        try {
          setHistory([]);
          const { data } = await fetch(url, options).then(res => res.json());
          if (data && data.transfers) {
            if (data.transfers.length > 0) {
              setHistory(data.transfers);
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      getHistory();
    }
  }, [selectedWallet]);

  return (
    <MainContainer style={{ display: 'flex' }}>
      <div style={{ minWidth: 500, padding: 8 }}>
        <HeaderBar amount={amount} />
        {wallets.map(wallet => {
          const { coin, name, balances, icon } = wallet;
          const price = prices[coin] ? prices[coin].MXN.PRICE : 0;

          return (
            <Wallet
              key={coin}
              selected={selectedWallet === coin}
              img={icon}
              name={name}
              tag={coin}
              balance={balances.available}
              price={price}
              onClick={handleSelectWallet(coin)}
            />
          );
        })}
      </div>
      <div style={{ width: '100%' }}>
        <History data={history} />
      </div>
    </MainContainer>
  );
};

const mapStateToProps = ({ auth, wallets }) => ({
  state: {
    token: auth.userToken,
    wallets: wallets.wallets,
    coins: wallets.coins,
    prices: wallets.prices,
  },
});

const mapdispatchToProps = dispatch => ({
  actions: {
    getWallets: token => dispatch(getWallets(token)),
    getWalletsPrice: coins => dispatch(getWalletsPrice(coins)),
  },
});

export default connect(
  mapStateToProps,
  mapdispatchToProps,
)(Wallets);
