import { Contract, ethers } from "ethers";
import React, { useState } from "react";
import styled from "styled-components";

import { BOOK_LIBRARY } from "src/constants/abis/BookLibrary";
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from "src/helpers/utilities";
import Column from "./Column";
import ConnectButton from "./ConnectButton";
import Loader from "./Loader";
import { BOOK_LIBRARY_ADDRESS } from "src/constants/contracts";

interface ILibraryProps {
    signer: any,
    contract: Contract,
    tokenWrappedContract: Contract,
    tokenContract: Contract,
    library: any,
    walletAddress: string
}

interface ILibraryWriteState {
    bookName: string;
    chosenBook: string;
    bookInfoName: string;
    copies: number | null;
    transactionHash: string;
    txnURL: string;
    fetching: boolean;
}

const INITIAL_STATE: ILibraryWriteState = {
    bookName: "",
    chosenBook: "",
    bookInfoName: "",
    copies: null,
    transactionHash: "",
    txnURL: "",
    fetching: false
}

interface IBookInfoState {
    bookName: string,
    bookCopies: number,
    bookOwnedByUser: string,
}

const INITIAL_BOOK_INFO_STATE: IBookInfoState = {
    bookName: "",
    bookCopies: 0,
    bookOwnedByUser: ""
}

interface ITokenInteractState {
    amount: number | null;
}

const INITIAL_TOKEN_STATE: ITokenInteractState = {
    amount: null,
}

const SContainer = styled.div`
    width: 100%
    text-align: center;
`;

const SBContainer = styled.div`
    margin-right: 1%;
    display: inline-block;
`;

const SFieldset = styled.fieldset`
    margin: 20px 0;
`;

const SAnchor = styled.a`
    color: blue;
    text-decoration: none;
    border-bottom: 1px solid blue;
`

const REQUIRED_LIB_AMOUNT = 0.1;

const LibraryInteract = (props: ILibraryProps) => {
    const signer = props.signer;
    const library = props.library;
    const contract = props.contract;
    const tokenWrappedContract = props.tokenWrappedContract;
    const tokenContract = props.tokenContract;
    const wallet = props.walletAddress;
    const [bookState, setBookState] = useState(INITIAL_STATE);
    const [userBal, setUserBal] = useState(0.0);
    const [tokenState, setTokenState] = useState(INITIAL_TOKEN_STATE);
    const [bookInfo, setBookInfo] = useState(INITIAL_BOOK_INFO_STATE);

    const handleBookNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, bookName: event.target.value})
    };

    const handleCopiesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const copies = parseInt(event.target.value, 0);
        setBookState({...bookState, copies})
    };

    const handleSendAmountChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const amount = parseFloat(event.target.value);
        setTokenState({ amount });
    };

    const handleBookBorrowNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, chosenBook: event.target.value});
    };

    const handleBookInfoNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, bookInfoName: event.target.value})
    };

    const addBook = async () => {
        if (bookState.bookName === "" || bookState.copies === 0) {
            alert("All the fields are mandatory and copies bigger than 0!");
            return;
        }

        let transaction;
        try {
            setBookState({...bookState, fetching: true})

            transaction = await contract.addBook(bookState.bookName, bookState.copies);
            
            contract.on('AddBook', (bookName, availableCopies, tx) => {
                showNotification("addBook event fired---", NOTIFICATION_SUCCESS);
                console.log("testing book name hook: ", bookName);
                console.log("testing copies hook: ", availableCopies);
                console.log("testing tx address hook: ", tx.transactionHash);
            });

            setBookState({...bookState, transactionHash: transaction.hash, fetching: true})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash, fetching: true})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, bookName: "", copies: 0, fetching: false})

                return;
            }

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
            setBookState({...bookState, bookName: "", copies: 0, fetching: false});
        } catch (err) {
            showNotification(err.message, NOTIFICATION_ERROR);
            setBookState({...bookState, bookName: "", copies: 0, fetching: false})
        }
    }

    const BorrowBook = async () => {
        if (bookState.chosenBook === "") {
            alert("Book to Borrow field is mandatory!");
            return;
        }

        const bal =  await getUserBalance(wallet);
        const realValue = parseFloat(ethers.utils.formatEther(bal));
        if (realValue < REQUIRED_LIB_AMOUNT) {
            const messageTxt = "There is no enough LIB to borrow the Book. You need at least " + REQUIRED_LIB_AMOUNT + " LIB.";
            alert(messageTxt);
            return;
        } else {
            const confirmBox = window.confirm("Do you really want to pay " + REQUIRED_LIB_AMOUNT + " LIB?");
            if (confirmBox === false) {
                return;
            }
        }

        let transaction;
        try {
            setBookState({...bookState, fetching: true});
            
            const rentAmount = ethers.utils.parseEther(REQUIRED_LIB_AMOUNT.toString());
            // console.log(rentAmount);
            // console.log(ethers.utils.formatEther(rentAmount));
            // const approveTx = await tokenContract.approve(contract.address, rentAmount);
            // await approveTx.wait();
            // console.log(' Approve done! ');

            // await tokenContract.transferFrom(wallet, contract.address, rentAmount);

            // transaction = await contract.borrowBook(bookState.chosenBook);
            const approvalResponse = await onAttemptToApprove();
            const iface = new ethers.utils.Interface(BOOK_LIBRARY.abi);
            const encodedBookBorrow = iface.encodeFunctionData("borrowBook", [bookState.chosenBook, rentAmount, approvalResponse.deadline, approvalResponse.v, approvalResponse.r, approvalResponse.s]);
            
            const tx = {
                to: BOOK_LIBRARY_ADDRESS,
                data: encodedBookBorrow
            };

            console.log('passed encode func data');
            transaction = await signer.sendTransaction(tx);

            contract.on('OrderResult', (bookName, availableCopies, customerAddr, tx) => {
                showNotification("OrderResult event fired---", NOTIFICATION_SUCCESS);
                console.log("testing book name hook: ", bookName);
                console.log("testing copies hook: ", availableCopies);
                console.log("testing customer addr hook: ", customerAddr);
                console.log("testing tx address hook: ", tx.transactionHash);
            });
            
            setBookState({...bookState, transactionHash: transaction.hash, fetching: true})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash, fetching: true})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);
                
                setBookState({...bookState, chosenBook: "", fetching: false});

                return;
            }

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
            setBookState({...bookState, chosenBook: "", fetching: false});
        } catch (err) {
            console.log(err.message);
            showNotification(err.message, NOTIFICATION_ERROR);

            setBookState({...bookState, chosenBook: "", fetching: false});
        }
    }

    const ReturnBook = async () => {
        if (bookState.chosenBook === "") {
            alert("Book to Borrow field is mandatory!");
            return;
        }

        let transaction;
        try {
            setBookState({...bookState, fetching: true})
            
            transaction = await contract.returnBook(bookState.chosenBook);
            
            setBookState({...bookState, transactionHash: transaction.hash, fetching: true})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash, fetching: true})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, chosenBook: "", fetching: false})

                return;
            }

            await contract.unwrapToken(tokenWrappedContract.address);
            console.log("unwrapped (returned back) the rent amount successfully.");

            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
        } catch (err) {
            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification(err.message, NOTIFICATION_ERROR);
        }
    }

    const getBookInfo = async () => {
        if (bookState.bookInfoName === "") {
            alert("Book Name field is mandatory!");
            return;
        }

        try {
            const bookData = await contract.getBook(bookState.bookInfoName);
            const isOwned = await contract.isBookOwnedByCustomer(bookState.bookInfoName);

            console.log(bookData);
            console.log(bookData[1] !== 0);
            if (bookData[1] !== 0) {
                const bookOwnedByUser = isOwned ? "You borrowed " + bookData[0] : "";
                setBookInfo({ bookName: bookData[0], bookCopies: bookData[1], bookOwnedByUser });
            } else {
                showNotification("There are no available copies of " + bookState.bookInfoName + " in the library.", NOTIFICATION_ERROR);
            }
        } catch (err) {
            showNotification(err.message, NOTIFICATION_ERROR);
        }

        setBookState({...bookState, bookInfoName: ""});
    }

    const clearBookInfo = async () => {
        setBookInfo({ bookName: "", bookCopies: 0, bookOwnedByUser: "" });
        setBookState({...bookState, bookInfoName: ""});
    }

    async function getUserBalance(_wallet: string) {
        return await tokenContract.balanceOf(_wallet);
    }

    async function setUserBalance() {
        const bal =  await getUserBalance(wallet);
        // const realValue = ethers.utils.formatEther(bal);
        const realValue = ethers.utils.formatUnits(bal, 18)
        setUserBal(parseFloat(realValue));
    }

    async function sendLIB() {
        if (!tokenState.amount || tokenState.amount === 0) {
            alert("The amount field is mandatory and needs to be more than 0.");
            return;
        }

        const wrapAmount = tokenState.amount ? tokenState.amount.toString() : "";
        const wrapValue = ethers.utils.parseEther(wrapAmount);
        
        try {
            setBookState({...bookState, fetching: true});

            const wrapTx = await tokenWrappedContract.wrap({ value: wrapValue });

            setBookState({...bookState, transactionHash: wrapTx.hash, fetching: true})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + wrapTx.hash, fetching: true})

            await wrapTx.wait();
        } catch (err) {
            showNotification(err.message, NOTIFICATION_ERROR);
        }

        console.log(" LIB wrapped ");
        setTokenState({ amount: 0 });
        setBookState({...bookState, fetching: false})
    }

    async function receiveLIB() {
        if (!tokenState.amount || tokenState.amount === 0) {
            alert("The amount field is mandatory and needs to be more than 0.");
            return;
        }

        const wrapAmount = tokenState.amount ? tokenState.amount.toString() : "";
        const wrapValue = ethers.utils.parseEther(wrapAmount);

        try {
            setBookState({...bookState, fetching: true});

            console.log("wrapped contract addr: ", tokenWrappedContract.address);
            const approveTx = await tokenContract.approve(tokenWrappedContract.address, wrapValue);
            await approveTx.wait();
            console.log(' Approve done! ');
            
            const unwrapTx = await tokenWrappedContract.unwrap(wrapValue);

            setBookState({...bookState, transactionHash: unwrapTx.hash, fetching: true})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + unwrapTx.hash, fetching: true})

            await unwrapTx.wait();

            console.log(' Unwrap done! ');
        } catch(err) {
            showNotification(err.message, NOTIFICATION_ERROR);
            // if (err.code === 4001) {
            //     showNotification(err.message, NOTIFICATION_ERROR);
            // } else {
            //     console.log(err);
            //     showNotification("Transaction failed", NOTIFICATION_ERROR);
            // }
        }

        setTokenState({ amount: 0 });
        setBookState({...bookState, fetching: false})
    }

    async function onAttemptToApprove() {
		// const { tokenContract, address, library } = this.state;
		
		const nonce = (await tokenContract.nonces(wallet)); // Our Token Contract Nonces
        const deadline = + new Date() + 60 * 60; // Permit with deadline which the permit is valid
        const wrapValue = ethers.utils.parseEther('0.1'); // Value to approve for the spender to use
            
            const EIP712Domain = [ // array of objects -> properties from the contract and the types of them ircwithPermit
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'verifyingContract', type: 'address' }
        ];

        const domain = {
            name: await tokenContract.name(),
            version: '1',
            verifyingContract: tokenContract.address
        };

        const Permit = [ // array of objects -> properties from erc20withpermit
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
        ];

        const message = {
            owner: wallet,
            spender: BOOK_LIBRARY_ADDRESS,
            value: wrapValue.toString(),
            nonce: nonce.toHexString(),
            deadline
        };

        const data = JSON.stringify({
            types: {
                EIP712Domain,
                Permit
            },
            domain,
            primaryType: 'Permit',
            message
        })

        const signatureLike = await library.send('eth_signTypedData_v4', [wallet, data]);
        const signature = await ethers.utils.splitSignature(signatureLike)

        const preparedSignature = {
            v: signature.v,
            r: signature.r,
            s: signature.s,
            deadline
        }

        return preparedSignature
    }

    return (
        <div>
            <h3>Book Library</h3>
            <p>Contract address: { contract.address }</p>
            
            {bookState.fetching ? (
                <Column center>
                    <SContainer>
                        <Loader />
                        <p>{ bookState.transactionHash }</p>
                        <SAnchor href={ bookState.txnURL } target="_blank">{ bookState.txnURL }</SAnchor>
                    </SContainer>
                </Column>
            ) : (
                <SContainer>
                    <SFieldset>
                        <label>
                            <p>Book Name</p>
                            <input type="text" name="name" placeholder="Book Name" onChange={handleBookNameChange} required />
                        </label>
                    </SFieldset>

                    <SFieldset>
                        <label>
                            <p>Book Copies</p>
                            <input type="number" min="0" name="copies" placeholder="Book Copies" onChange={handleCopiesChange} />
                        </label>
                    </SFieldset>
                    <ConnectButton text="Add Book" onClick={addBook} />

                    <SFieldset>
                        <label>
                            <p>Book Name to Borrow or Return</p>
                            <input type="text" name="name1" placeholder="Book Name" onChange={handleBookBorrowNameChange} required />
                        </label>
                    </SFieldset>

                    <SContainer>
                        <SBContainer><ConnectButton text="Borrow Book" onClick={BorrowBook} /></SBContainer>
                        <SBContainer><ConnectButton text="Return Book" onClick={ReturnBook} /></SBContainer>
                    </SContainer>

                    <SFieldset>
                        <label>
                            <p>Book Name</p>
                            <input type="text" name="name2" placeholder="Book Name" onChange={handleBookInfoNameChange} required />
                        </label>

                        { (bookInfo.bookName !== "" && bookInfo.bookCopies !== 0) &&
                            <SContainer>
                                <p>Book Name: { bookInfo.bookName }</p>
                                <p>Book Copies: { bookInfo.bookCopies }</p>
                                <p>{ bookInfo.bookOwnedByUser }</p>
                            </SContainer>
                        }
                    </SFieldset>
                    <SContainer>
                        <SBContainer><ConnectButton text="Book Info" onClick={getBookInfo} /></SBContainer>
                        <SBContainer><ConnectButton text="Clear Info" onClick={clearBookInfo} /></SBContainer>
                    </SContainer>
                    
                    {
                        false && 
                        <SContainer>
                            <p>Token Wrapped contract { tokenWrappedContract.address }</p>
                            <p>Token contract { tokenContract.address }</p>
                            
                            <SContainer>
                                <SBContainer>
                                    <button onClick={ setUserBalance }>Get user LIB balance</button>
                                </SBContainer>
                                
                                <SBContainer>
                                    <p>User bal: { userBal }</p>
                                </SBContainer>
                            </SContainer>
                        </SContainer>
                    }

                    <SFieldset>
                        <label>
                            <p>Amount to wrap or unwrap</p>
                            <input type="number" min="0" name="amount" placeholder="Amount to wrap/unwrap" onChange={handleSendAmountChange} />
                        </label>
                    </SFieldset>

                    <SContainer>
                        <SBContainer>
                            <button onClick={ sendLIB }>Wrap LIB</button>
                        </SBContainer>
                        
                        <SBContainer>
                            <button onClick={ receiveLIB }>Unwrap LIB</button>
                        </SBContainer>
                    </SContainer>
                </SContainer>
            )}
        </div>
    )
}

export default LibraryInteract;