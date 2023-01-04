import styled from "styled-components"
import { useMovieContext } from '../context/MovieContext';

const FinishButtonComponent = styled.div`
    button {
        background-color: #2770A4;
        color: white;
        font-weight: 700;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-size: 16px;
        width: 100%;

        &:disabled {
            background-color: #b5d3ff;
            cursor: default;
        }
    }
`

const ClearButtonComponent = styled.div`
    button {
        background-color: #ff5073;
        color: white;
        text-align: center;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-weight: 700;
        margin-bottom: 8px;
        font-size: 16px;
        width: 100%;

        &:disabled {
            background-color: #ffb5c4;
            cursor: default;
        }
    }
    
`

export const FinishButton = ({ disabled }: any) => {
    const { setMovies }: any = useMovieContext();

    const handleClick = () => {
        if(!disabled){
            localStorage.removeItem('movies');
            setMovies([]);
        }  
    }

    return (
        <FinishButtonComponent>
            <button disabled={disabled} onClick={handleClick}>Finish</button>
        </FinishButtonComponent>
    )
}

export const ClearButton = ({ disabled }: any) => {
    const { setMovies }: any = useMovieContext();

    console.log('hola dis', disabled)

    const handleClick = () => {
        if(!disabled){
            localStorage.removeItem('movies');
            setMovies([]);
        }
    }
    return (
        <ClearButtonComponent>
            <button disabled={disabled} onClick={handleClick}>Clear Car</button>
        </ClearButtonComponent>
    )
}