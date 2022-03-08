import * as React from 'react';
import styled from 'styled-components';

import Web3Modal from 'web3modal';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import Column from './components/Column';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Loader from './components/Loader';
import ConnectButton from './components/ConnectButton';
import StateForm from './components/StateForm';

import { getChainData, NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from './helpers/utilities';
import { US_ELECTION_ADDRESS } from './constants';
import { US_ELECTION } from './constants/abis/USElection';
import { getContract } from './helpers/ethers'

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
  connected: boolean;
  chainId: number;
  pendingRequest: boolean;
  result: any | null;
  electionContract: Contract | null;
  currentLeader: number | null;
  seatsBiden: number | null;
  seatsTrump: number | null;
  isEnded: boolean | null;
  transactionHash: string | null;
  submissionFormSate: ISubmissionFormState | null;
}

interface ISubmissionFormState {
  name: string;
  votesBiden: number | null;
  votesTrump: number | null;
  stateSeats: number | null;
  isEnded: boolean | null;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: '',
  library: null,
  connected: false,
  chainId: 1,
  pendingRequest: false,
  result: null,
  electionContract: null,
  currentLeader: null,
  seatsBiden: null,
  seatsTrump: null,
  isEnded: null,
  transactionHash: null,
  submissionFormSate: null
};

class App extends React.Component<any, any> {
  // @ts-ignore
  public web3Modal: Web3Modal;
  public state: IAppState;
  public provider: any;
  public electionContract: Contract;

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

    const network = await library.getNetwork();

    const address = this.provider.selectedAddress ? this.provider.selectedAddress : this.provider?.accounts[0];

    // get the contract
    this.electionContract = getContract(US_ELECTION_ADDRESS, US_ELECTION.abi, library, address);

    const currentLeader = await this.electionContract?.currentLeader();
    const seatsBiden = await this.electionContract?.seats(1);
    const seatsTrump = await this.electionContract?.seats(2);
    const isEnded = await this.electionContract?.electionEnded();

    await this.setState({
      library,
      chainId: network.chainId,
      address,
      connected: true,
      electionContract: this.electionContract,
      currentLeader,
      seatsBiden,
      seatsTrump,
      isEnded
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

    this.setState({ ...INITIAL_STATE });

  };

  public endElection = async () => {
    const electionContract = this.state.electionContract;

    this.setState({ fetching: true });

    const isEnded = await electionContract?.electionEnded();
    if (isEnded) {
      alert("Election has ended already!");
    } else {
      const transaction = await electionContract?.endElection();

      const transactionReceipt = await transaction.wait();
      if (transactionReceipt.status !== 1) {
        // React to failure
        alert("Transaction failed");
      }
    }

    this.setState({ fetching: false });
  };

  public render = () => {
    const {
      address,
      connected,
      chainId,
      fetching,
      currentLeader,
      seatsBiden,
      seatsTrump,
      isEnded
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

          {
            this.state.connected && <StateForm formText='State Submission Form' contract={this.electionContract} currentLeader={currentLeader} seatsBiden={seatsBiden} seatsTrump={seatsTrump} isEnded={isEnded} />
          }
        </Column>
      </SLayout>
    );
  };
}

export default App;
