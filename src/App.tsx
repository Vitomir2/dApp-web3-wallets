import * as React from 'react';
import styled from 'styled-components';

import Web3Modal from 'web3modal';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

import Column from './components/Column';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Loader from './components/Loader';
import ConnectButton from './components/ConnectButton';
import { getChainData, NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from './helpers/utilities';
import { getContract } from './helpers/ethers'
import { BOOK_LIBRARY_ADDRESS } from './constants/contracts';
import { BOOK_LIBRARY } from './constants/abis/BookLibrary';
import { LIB_WRAPPED_TOKEN } from './constants/abis/LIBWrapped';
import { LIB_TOKEN } from './constants/abis/LIBToken';
import LibraryInteract from './components/LibraryInteractions';

const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`;

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SLanding = styled(Column)`
  height: 600px;
`;

// @ts-ignore
const SBalances = styled(SLanding)`
  height: 100%;
  & h3 {
    padding-top: 30px;
  }
`;

interface IAppState {
  fetching: boolean;
  address: string;
  library: any;
  signer: any;
  connected: boolean;
  chainId: number;
  pendingRequest: boolean;
  result: any | null;
  libraryContract: any | null;
  tokenContract: any | null;
  tokenWrappedContract: any | null;
  info: any | null;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: '',
  library: null,
  signer: null,
  connected: false,
  chainId: 1,
  pendingRequest: false,
  result: null,
  libraryContract: null,
  tokenContract: null,
  tokenWrappedContract: null,
  info: null
};

class App extends React.Component<any, any> {
  // @ts-ignore
  public web3Modal: Web3Modal;
  public state: IAppState;
  public provider: any;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });
  }

  public componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
  }

  public onConnect = async () => {
    try {
      this.provider = await this.web3Modal.connect();

      showNotification('Connection Successful.', NOTIFICATION_SUCCESS);
    } catch (err) {
      showNotification('Connection Failed.', NOTIFICATION_ERROR);
      return;
    }

    const library = new Web3Provider(this.provider);

    const signer = library.getSigner();

    const network = await library.getNetwork();

    const address = this.provider.selectedAddress ? this.provider.selectedAddress : this.provider?.accounts[0];

    // get the contract
    if (!ethers.utils.isAddress(address)) {
      showNotification(address + " is not a valid address.", NOTIFICATION_ERROR);
    }

    const libraryContract = getContract(BOOK_LIBRARY_ADDRESS, BOOK_LIBRARY.abi, library, address);

    const libTokenAddr = await libraryContract.LIBToken();
    const wrapperAddr = await libraryContract.wrapperContract();
    
    console.log("LIB: ", libTokenAddr);
    console.log("WLIB: ", wrapperAddr);
    
    if (!ethers.utils.isAddress(libTokenAddr)) {
      showNotification(libTokenAddr + " is not a valid address.", NOTIFICATION_ERROR);
    }

    if (!ethers.utils.isAddress(wrapperAddr)) {
      showNotification(wrapperAddr + " is not a valid address.", NOTIFICATION_ERROR);
    }

    // get the token contract
    const tokenContract = getContract(libTokenAddr, LIB_TOKEN.abi, library, address);
    const tokenWrappedContract = getContract(wrapperAddr, LIB_WRAPPED_TOKEN.abi, library, address);

    await this.setState({
      library,
      signer,
      chainId: network.chainId,
      address,
      connected: true,
      libraryContract,
      tokenContract,
      tokenWrappedContract
    });

    await this.subscribeToProviderEvents(this.provider);

  };

  public subscribeToProviderEvents = async (provider:any) => {
    if (!provider.on) {
      return;
    }

    provider.on("accountsChanged", this.changedAccount);
    provider.on("networkChanged", this.networkChanged);
    provider.on("close", this.close);

    await this.web3Modal.off('accountsChanged');
  };

  public async unSubscribe(provider:any) {
    // Workaround for metamask widget > 9.0.3 (provider.off is undefined);
    window.location.reload();
    if (!provider.off) {
      return;
    }

    provider.off("accountsChanged", this.changedAccount);
    provider.off("networkChanged", this.networkChanged);
    provider.off("close", this.close);
  }

  public changedAccount = async (accounts: string[]) => {
    if(!accounts.length) {
      // Metamask Lock fire an empty accounts array 
      await this.resetApp();
    } else {
      await this.setState({ address: accounts[0] });
    }
  }

  public networkChanged = async (networkId: number) => {
    const library = new Web3Provider(this.provider);
    const network = await library.getNetwork();
    const chainId = network.chainId;
    await this.setState({ chainId, library });
  }
  
  public close = async () => {
    this.resetApp();
  }

  public getNetwork = () => getChainData(this.state.chainId).network;

  public getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      }
    };
    return providerOptions;
  };

  public resetApp = async () => {
    await this.web3Modal.clearCachedProvider();
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    await this.unSubscribe(this.provider);

    this.state.libraryContract.removeAllListeners();
    this.state.tokenContract.removeAllListeners();
    this.state.tokenWrappedContract.removeAllListeners();
    
    // this.state.libraryContract.on('AddBook', (bookName, availableCopies, tx) => {
    //   tx.removeListener();
    //   console.log("removed AddBook listeners --- ");
    // });

    // this.state.libraryContract.on('OrderResult', (bookName, availableCopies, customerAddr, tx) => {
    //   tx.removeListener();
    //   console.log("removed OrderResult listeners --- ");
    //   showNotification("remove listener fired ---", NOTIFICATION_SUCCESS);
    // });

    this.setState({ ...INITIAL_STATE });

  };

  public render = () => {
    const {
      address,
      connected,
      chainId,
      fetching
    } = this.state;
    return (
      <SLayout>
        <Column maxWidth={1000} spanHeight>
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            killSession={this.resetApp}
          />
          {
            !this.state.connected &&
            <SContent>
              {fetching ? (
                <Column center>
                  <SContainer>
                    <Loader />
                  </SContainer>
                </Column>
              ) : (
                <SLanding center>
                  <ConnectButton text='Connect' onClick={this.onConnect} />
                </SLanding>
              )}
            </SContent>
          }

          { this.state.connected && <LibraryInteract signer={ this.state.signer } library={ this.state.library } contract={ this.state.libraryContract } tokenWrappedContract={ this.state.tokenWrappedContract }
                tokenContract={ this.state.tokenContract } walletAddress={ this.state.address } /> }
        </Column>
      </SLayout>
    );
  };
}

export default App;
