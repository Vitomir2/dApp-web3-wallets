// Have a UI to create book, rent a book, return a book, see books available and their copies
// Connect the corresponding calls and transactions
// Wait for transactions (loading)
// React on transaction results (update state)
// Handle errors and faulty transactions (error handling)

import { Contract } from "ethers";
import React, { useState } from "react";
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, showNotification } from "src/helpers/utilities";
import styled from "styled-components";
import Column from "./Column";
import ConnectButton from "./ConnectButton";
import Loader from "./Loader";

interface ILibraryProps {
    contract: Contract,
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

const SContainer = styled.div`
    width: 100%
    text-align: center;
`;

const SBContainer = styled.div`
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

const LibraryInteract = (props: ILibraryProps) => {;
    const contract = props.contract;
    const [bookState, setBookState] = useState(INITIAL_STATE);
    let bookName = "";
    let bookCopies = 0;
    let bookOwnedByUser = "";

    const handleBookNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, bookName: event.target.value})
    };

    const handleCopiesChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const copies = parseInt (event.target.value, 0);
        setBookState({...bookState, copies})
    };

    const handleBookBorrowNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, chosenBook: event.target.value})
    };

    const handleBookInfoNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setBookState({...bookState, bookInfoName: event.target.value})
    };

    async function bookAction(isBorrow: boolean) {
        if (bookState.chosenBook === "") {
            alert("Book to Borrow field is mandatory!");
            return;
        }

        let transaction;
        try {
            setBookState({...bookState, fetching: true})
            
            if (isBorrow) {
                transaction = await contract.borrowBook(bookState.chosenBook);
            } else {
                transaction = await contract.returnBook(bookState.chosenBook);
            }
            
            setBookState({...bookState, transactionHash: transaction.hash})
            setBookState({...bookState, txnURL: 'https://ropsten.etherscan.io/tx/' + transaction.hash})

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

            showNotification(err.error.message, NOTIFICATION_ERROR);
        }
    }


    const addBook = async () => {
        if (bookState.bookName === "" || bookState.copies === 0) {
            alert("All the fields are mandatory and copies bigger than 0!");
            return;
        }

        let transaction;
        try {
            setBookState({...bookState, fetching: true})
            
            transaction = await contract.addBook(bookState.bookName, bookState.copies);
            
            setBookState({...bookState, transactionHash: transaction.hash})
            setBookState({...bookState, txnURL: 'https://ropsten.etherscan.io/tx/' + transaction.hash})

            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                // React to failure
                showNotification("Transaction Failed.", NOTIFICATION_ERROR);

                setBookState({...bookState, bookName: "", copies: 0, fetching: false})

                return;
            }

            setBookState({...bookState, bookName: "", copies: 0, fetching: false})

            showNotification("Transaction processed successfully.", NOTIFICATION_SUCCESS);
        } catch (err) {
            setBookState({...bookState, bookName: "", copies: 0, fetching: false})

            showNotification(err.error.message, NOTIFICATION_ERROR);
        }
    }

    const BorrowBook = async () => {
        bookAction(true);
    }

    const ReturnBook = async () => {
        bookAction(false);
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

            showNotification(err.error.message, NOTIFICATION_ERROR);
        }
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
                </SContainer>
            )}
        </div>
    )
}

export default LibraryInteract;