import { Contract } from 'ethers'
import * as React from 'react'
import { useReducer } from 'react';
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from 'src/helpers/utilities';
import styled from 'styled-components'

import Column from './Column'

import ConnectButton from './ConnectButton'
import ElectionInfo from './ElectionInfo';
import Loader from './Loader'

interface IStateFormProps {
    formText: string,
    contract: Contract,
    currentLeader: number | null,
    seatsBiden: number | null,
    seatsTrump: number | null,
    isEnded: boolean | null
}

interface ISubmissionFormState {
    name: string;
    votesBiden: string;
    votesTrump: string;
    stateSeats: string;
    fetching: boolean;
    transactionHash: string;
    txnURL: string;
}

const INITIAL_STATE: ISubmissionFormState = {
    name: "",
    votesBiden: "",
    votesTrump: "",
    stateSeats: "",
    fetching: false,
    transactionHash: "",
    txnURL: ""
}

const SContainer = styled.div`
    padding: 5px 20px;
`;

const SFieldset = styled.fieldset`
    margin: 20px 0;
`;

const SAnchor = styled.a`
    color: blue;
    text-decoration: none;
    border-bottom: 1px solid blue;
`

type Action = { type: 'setStateName', payload: string }
  | { type: 'setVotesBiden', payload: string }
  | { type: 'setVotesTrump', payload: string }
  | { type: 'setStateSeats', payload: string }
  | { type: 'setFetching', payload: boolean }
  | { type: 'setTxn', payload: string }
  | { type: 'setTxnURL', payload: string };

const reducer = (state: ISubmissionFormState, action: Action): ISubmissionFormState => {
    switch (action.type) {
        case 'setStateName': 
        return {
            ...state,
            name: action.payload
        };
        case 'setVotesBiden': 
        return {
            ...state,
            votesBiden: action.payload
        };
        case 'setVotesTrump': 
        return {
            ...state,
            votesTrump: action.payload
        };
        case 'setStateSeats': 
        return {
            ...state,
            stateSeats: action.payload
        };
        case 'setFetching': 
        return {
            ...state,
            fetching: action.payload
        };
        case 'setTxn': 
        return {
            ...state,
            transactionHash: action.payload
        };
        case 'setTxnURL': 
        return {
            ...state,
            txnURL: action.payload
        };
    }
}

const StateForm = (props: IStateFormProps) => {
    const formText = props.formText;
    const contract = props.contract;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const initialInfo = { currentLeader: props.currentLeader, seatsBiden: props.seatsBiden, seatsTrump: props.seatsTrump, isEnded: props.isEnded }
    const [info, setInfo] = React.useState(initialInfo);

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setStateName',
            payload: event.target.value
        });
    };
    
    const handleVotesBidenChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setVotesBiden',
            payload: event.target.value
        });
    };

    const handleVotesTrumpChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setVotesTrump',
            payload: event.target.value
        });
    };

    const handleStateSeatsChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setStateSeats',
            payload: event.target.value
        });
    };

    const submitElectionResult = async () => {
        dispatch({
            type: 'setTxn',
            payload: ""
        });
        
        dispatch({
            type: 'setTxnURL',
            payload: ""
        });

        if (state.name === "" || state.votesBiden === "" || state.votesTrump === "" || state.stateSeats === "") {
            alert("All the fields are mandatory!");
            return;
        }

        const dataArr = [
            state.name,
            state.votesBiden,
            state.votesTrump,
            state.stateSeats
        ];

        let transaction;
        try {
            dispatch({
                type: 'setFetching',
                payload: true
            });

            transaction = await contract.submitStateResult(dataArr);
            alert(transaction);
            
            dispatch({
                type: 'setTxn',
                payload: transaction.hash
            });

            dispatch({
                type: 'setTxnURL',
                payload: 'https://ropsten.etherscan.io/tx/' + transaction.hash
            });

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                dispatch({
                    type: 'setFetching',
                    payload: false
                });

                return;
            }

            dispatch({
                type: 'setFetching',
                payload: false
            });

            const currentLeader = await contract?.currentLeader();
            const seatsBiden = await contract?.seats(1);
            const seatsTrump = await contract?.seats(2);
            setInfo({ currentLeader, seatsBiden, seatsTrump, isEnded: false });
            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
        } catch (err) {
            dispatch({
                type: 'setFetching',
                payload: false
            });

            showNotification("Transaction Failed.", NOTIFICATION_ERROR);

            // alert(err);

            // const code = err.data.replace('Reverted ','');
            // // console.log({err});
            // const reason = ethers.utils.toUtf8String('0x' + code.substr(138));
            // alert('revert reason: ' + reason);
        }
    }

    const endElection = async () => {
        dispatch({
            type: 'setFetching',
            payload: true
        });
    
        if (info.isEnded) {
          alert("Election has ended already!");
        } else {
          const transaction = await contract?.endElection();
    
          const transactionReceipt = await transaction.wait();
          if (transactionReceipt.status !== 1) {
            // React to failure
            alert("Transaction failed");
            
            dispatch({
                type: 'setFetching',
                payload: false
            });

            return;
          }
        }

        setInfo({...info, isEnded: true});
      };

    return (
        <div>
            <ElectionInfo label='Election info' currentLeader={info.currentLeader} seatsBiden={info.seatsBiden} seatsTrump={info.seatsTrump} isEnded={info.isEnded} />
            { state.fetching ? (
                <Column center>
                    <SContainer>
                        <Loader />
                        <p>{ state.transactionHash }</p>
                        <SAnchor href={ state.txnURL } target="_blank">{ state.txnURL }</SAnchor>
                    </SContainer>
                </Column>
            ) : (
                <SContainer>
                    <h3>{ formText }</h3>

                    <SFieldset>
                        <label>
                            <p>State Name</p>
                            <input type="text" name="name" placeholder="State Name" onChange={handleUsernameChange} required disabled={info.isEnded ? true : false} />
                        </label>
                    </SFieldset>

                    <SFieldset>
                        <label>
                            <p>Votes for Biden</p>
                            <input type="number" min="0" name="votesBiden" placeholder="Votes for Biden" onChange={handleVotesBidenChange} disabled={info.isEnded ? true : false} />
                        </label>
                    </SFieldset>

                    <SFieldset>
                        <label>
                            <p>Votes for Trump</p>
                            <input type="number" min="0" name="votesTrump" placeholder="Votes for Trump" onChange={handleVotesTrumpChange} disabled={info.isEnded ? true : false} />
                        </label>
                    </SFieldset>

                    <SFieldset>
                        <label>
                            <p>State Seats</p>
                            <input type="number" min="0" name="stateSeats" placeholder="State Seats" onChange={handleStateSeatsChange} disabled={info.isEnded ? true : false} />
                        </label>
                    </SFieldset>

                    <ConnectButton text='Submit a result' onClick={submitElectionResult} disabled={info.isEnded ? true : false} />

                    {state.fetching ? (
                        <Column center>
                            <SContainer>
                                <Loader />
                            </SContainer>
                        </Column>
                    ) : (
                        <ConnectButton text='End Election' onClick={endElection} disabled={info.isEnded ? true : false} />
                    )}
                </SContainer>
            )}
        </div>
    )
}

export default StateForm;