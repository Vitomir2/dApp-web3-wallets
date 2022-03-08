import React from "react";
import styled from "styled-components";

// import Column from "./Column";
// import ConnectButton from "./ConnectButton";
// import Loader from "./Loader";
// import Wrapper from "./Wrapper";

interface IElectionInfoProps {
    label: string,
    currentLeader: number | null,
    seatsBiden: number | null,
    seatsTrump: number | null,
    isEnded: boolean | null;
    // fetching: boolean
}

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
`;

const SParagraph = styled.a`
    margin-left: 3%
`

// const SContent = styled(Wrapper)`
//   width: 100%;
//   height: 100%;
//   padding: 0 16px;
// `;

const ElectionInfo = (props: IElectionInfoProps) => {
    const sectionLabel = props.label;
    const currLeader = props.currentLeader;
    const seatsBiden = props.seatsBiden;
    const seatsTrump = props.seatsTrump;
    const isEnded = props.isEnded;
    // const fetching = false;

    return (
        <div>
            <h3>{ sectionLabel }</h3>
            <SContainer>
                <h6>Current Leader: </h6> <SParagraph>{ currLeader }</SParagraph>
            </SContainer>

            <SContainer>
                <h6>Seats won by Biden: </h6> <SParagraph>{ seatsBiden }</SParagraph>
            </SContainer>

            <SContainer>
                <h6>Seats won by Trump: </h6> <SParagraph>{ seatsTrump }</SParagraph>
            </SContainer>

            <SContainer>
                <h5>{ isEnded ? "Election is ended!" : "Election is still ongoing..." } </h5>
            </SContainer>

            {/* <SContent>
                {fetching ? (
                    <Column center>
                    <SContainer>
                        <Loader />
                    </SContainer>
                    </Column>
                ) : (
                    <ConnectButton text='End Election' onClick={this.endElection} />
                )}
            </SContent> */}
        </div>
    )
}

export default ElectionInfo;