import { Contract, ethers } from "ethers";
import React, { useState } from "react";
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from "src/helpers/utilities";
import styled from "styled-components";
import Column from "./Column";
import ConnectButton from "./ConnectButton";
import Loader from "./Loader";

interface ILibraryProps {
    contract: Contract,
    tokenWrappedContract: Contract,
    tokenContract: Contract,
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

// const REQUIRED_LIB_AMOUNT = 0.1;

const LibraryInteract = (props: ILibraryProps) => {;
    const contract = props.contract;
    const tokenWrappedContract = props.tokenWrappedContract;
    const tokenContract = props.tokenContract;
    const wallet = props.walletAddress;
    const [bookState, setBookState] = useState(INITIAL_STATE);
    let bookName = "";
    let bookCopies = 0;
    let bookOwnedByUser = "";
    const [userBal, setUserBal] = useState(0.0);
    const [tokenState, setTokenState] = useState(INITIAL_TOKEN_STATE);

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

            setBookState({...bookState, transactionHash: transaction.hash})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, bookName: "", copies: 0, fetching: false})

                return;
            }

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);

            setBookState({...bookState, bookName: "", copies: 0, fetching: false})
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

        // vito - temporary hide the token functionality
        // const bal =  await getUserBalance(wallet);
        // const realValue = parseFloat(ethers.utils.formatEther(bal));
        // if (realValue < REQUIRED_LIB_AMOUNT) {
        //     const messageTxt = "There is no enough LIB to borrow the Book. You need at least " + REQUIRED_LIB_AMOUNT + " LIB.";
        //     alert(messageTxt);
        //     return;
        // } else {
        //     const confirmBox = window.confirm("Do you really want to pay " + REQUIRED_LIB_AMOUNT + " LIB?");
        //     if (confirmBox === false) {
        //         return;
        //     }
        // }

        let transaction;
        try {
            // vito - temporary hide the token functionality
            // const rentAmount = ethers.utils.parseEther(REQUIRED_LIB_AMOUNT.toString());
            // const approveTx = await tokenContract.approve(contract.address, rentAmount);
            // await approveTx.wait();
            // console.log(' Approve done! ');

            // await tokenContract.transferFrom(wallet, contract.address, rentAmount);
            
            setBookState({...bookState, fetching: true})

            transaction = await contract.borrowBook(bookState.chosenBook);

            contract.on('OrderResult', (bookName, availableCopies, customerAddr, tx) => {
                showNotification("OrderResult event fired---", NOTIFICATION_SUCCESS);
                console.log("testing book name hook: ", bookName);
                console.log("testing copies hook: ", availableCopies);
                console.log("testing customer addr hook: ", customerAddr);
                console.log("testing tx address hook: ", tx.transactionHash);
            });
            
            setBookState({...bookState, transactionHash: transaction.hash})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, chosenBook: "", fetching: false})

                return;
            }

            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
        } catch (err) {
            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification(err.message, NOTIFICATION_ERROR);
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
            
            setBookState({...bookState, transactionHash: transaction.hash})
            setBookState({...bookState, txnURL: 'https://rinkeby.etherscan.io/tx/' + transaction.hash})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, chosenBook: "", fetching: false})

                return;
            }

            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
        } catch (err) {
            setBookState({...bookState, chosenBook: "", fetching: false})

            showNotification(err.message, NOTIFICATION_ERROR);
        }
    }

    const getBookInfo = async () => {
        if (bookState.bookInfoName === "") {
            alert("Book to Borrow field is mandatory!");
            return;
        }

        try {
            const bookData = await contract.getBook(bookState.bookInfoName);
            const isOwned = await contract.isBookOwnedByCustomer(bookState.bookInfoName);

            if (bookData[1] !== 0) {
                console.log("book data: ", bookData[2]);
                bookName = bookData[0];
                bookCopies = bookData[1];
                bookOwnedByUser = isOwned ? "You borrowed " + bookData[0] : "";
            } else {
                showNotification("There are no available copies of " + bookState.bookInfoName + " in the library.", NOTIFICATION_ERROR);
            }
            setBookState({...bookState, bookInfoName: ""});
        } catch (err) {
            setBookState({...bookState, bookInfoName: ""});

            showNotification(err.message, NOTIFICATION_ERROR);
        }
    }

    async function getUserBalance(_wallet: string) {
        return await tokenContract.balanceOf(_wallet);
    }

    async function setUserBalance() {
        const bal =  await getUserBalance(wallet);
        const realValue = ethers.utils.formatEther(bal);
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
            const wrapTx = await tokenWrappedContract.wrap({ value: wrapValue });
            await wrapTx.wait();
        } catch (err) {
            showNotification(err.message, NOTIFICATION_ERROR);
        }

        console.log(" LIB wrapped ");
        setTokenState({ amount: 0 });
    }

    async function receiveLIB() {
        if (!tokenState.amount || tokenState.amount === 0) {
            alert("The amount field is mandatory and needs to be more than 0.");
            return;
        }

        const wrapAmount = tokenState.amount ? tokenState.amount.toString() : "";
        const wrapValue = ethers.utils.parseEther(wrapAmount);

        try {
            console.log("wrapped contract addr: ", tokenWrappedContract.address);
            const approveTx = await tokenContract.approve(tokenWrappedContract.address, wrapValue);
            await approveTx.wait();
            console.log(' Approve done! ');
            
            const unwrapTx = await tokenWrappedContract.unwrap(wrapValue);
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
                            <input type="text" name="name" placeholder="Book Name" onChange={handleBookBorrowNameChange} required />
                        </label>
                    </SFieldset>

                    <SContainer>
                        <SBContainer><ConnectButton text="Borrow Book" onClick={BorrowBook} /></SBContainer>
                        <SBContainer><ConnectButton text="Return Book" onClick={ReturnBook} /></SBContainer>
                    </SContainer>

                    <SFieldset>
                        <label>
                            <p>Book Name</p>
                            <input type="text" name="name" placeholder="Book to Borrow" onChange={handleBookInfoNameChange} required />
                        </label>

                        { bookName !== "" && bookCopies !== 0 ? (
                            <SContainer>
                                <p>Book Name: { bookName }</p>
                                <p>Book Copies: { bookCopies }</p>
                                <p>{ bookOwnedByUser }</p>
                            </SContainer>
                        ) : (
                            <p/>
                        )}
                    </SFieldset>
                    <ConnectButton text="Book Info" onClick={getBookInfo} />
                    
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

                            <p>{ tokenState.amount }</p>
                        </SContainer>
                    }
                </SContainer>
            )}
        </div>
    )
}

export default LibraryInteract;