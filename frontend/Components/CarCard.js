import styled from "styled-components";
import Link from "next/link";

const StyledCarCard = styled.div`
    padding: 1rem;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    font-size: 1.5rem;
    border: 1px solid yellow;
    border-radius: 10px;
    gap: 10px;
     
     a{
        border: 1px solid yellow;
        border-radius: 10px;
        padding: 0.5rem;
     }`


export default function CarCard({car}){
    return(
        <div className="carCard">

                <StyledCarCard>
                    <span>{car.inv}</span>
                    <span>{car.year}</span>
                    <span>{car.make}</span>
                    <span>{car.model}</span>
                    <Link href={`/singleCar/${car.id}`}>View</Link>
                </StyledCarCard>

        </div>
    );
};