import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeWallet</p>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
