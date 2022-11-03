import styled from "styled-components";

const StyledCarCard = styled.div`
    padding: 1rem;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    font-size: 1.5rem;
    border: 1px solid yellow;
    gap: 10px;
     `

export default function CarCard({car}){
    return(
        <div className="carCard">

                <StyledCarCard>
                    <span>{car.inv}</span>
                    <span>{car.year}</span>
                    <span>{car.make}</span>
                    <span>{car.model}</span>
                    <button>View More</button>
                </StyledCarCard>

        </div>
    );
};