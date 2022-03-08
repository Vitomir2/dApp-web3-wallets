import React from "react";
import styled from "styled-components";
interface IElectionInfoProps {
    label: string,
    currentLeader: number | null,
    seatsBiden: number | null,
    seatsTrump: number | null,
    isEnded: boolean | null;
}

const SContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
`;

const SParagraph = styled.a`
    margin-left: 3%
`

const ElectionInfo = (props: IElectionInfoProps) => {
    const sectionLabel = props.label;
    const currLeader = props.currentLeader;
    const seatsBiden = props.seatsBiden;
    const seatsTrump = props.seatsTrump;
    const isEnded = props.isEnded;

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
        </div>
    )
}

export default ElectionInfo;