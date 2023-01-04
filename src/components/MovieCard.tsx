import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { useMovieContext } from "../context/MovieContext";
import { IMovieAdd } from "../models/Movies.interface";
import noImg from "../assets/img/noimg.png";

const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 210px;
    border: 2px solid #2770A4;
    border-radius: 4px;
    background-color: white;
    padding: 10px;

    button {
        background-color: #2770A4;
        border: none;
        border-radius: 2px;
        padding: 5px;
        color: white;
        cursor: pointer;
        font-weight: bold;

        &:disabled {
            background-color: #b5d3ff;
            cursor: default;
        }
    }

    .text-center {
        text-align: center;
    }

    .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 210px;
    }

    .w-100 {
        width: 100%;
    }

    .w-40px {
        width: 40px;
    }

    .d-flex {
        display: flex;
    }

    .align-items-start {
        align-items: flex-start
    }

    .flex-column {
        flex-direction: column;
    }

    .justify-content-between {
        justify-content: space-between;
    }

    .mr-2 {
        margin-right: 16px;
    }

    .mb-2 {
        margin-bottom: 16px;
    }

`

export const MovieCard = ({ item }: any) => {
    const { movies, setMovies }: any = useMovieContext();
    const imgSrc = item.Poster !== "N/A" ? item.Poster : noImg;

    const currentDay = moment().format('YYYY-MM-DD');
    const [option, setOption] = useState('');
    const [rentDate, setRentDay] = useState(currentDay);
    const [count, setCount] = useState(1);

    const handleOption = (e: any) => {
        setOption(e.target.value);
    }

    const handleDate = (e: any) => {
        setRentDay(e.target.value);
    }

    const handleCount = (e: any) => {
        setCount(parseInt(e.target.value));
    }

    const handleAdd = () => {
        const obj = {
            option,
            title: item.Title,
            type: item.Type,
            year: item.Year,
            poster: item.Poster,
            id: item.imdbID,
            count,
            rentDate
        }
        const finalItems: IMovieAdd[] = [...movies, obj];
        localStorage.setItem('movies', JSON.stringify(finalItems));
        setMovies(finalItems);
    }

    return (
        <div>
            <ContentCard>
                <div className="text-center">
                    <img src={imgSrc} width={200} height={300}/>
                </div>
                <div className="d-flex flex-column align-items-start">
                    <span title={item.Title} className="title">{`Title: ${item.Title}`}</span>
                    <span>{`Type: ${item.Type}`}</span>
                    <span>{`Year: ${item.Year}`}</span> 
                </div>
                <hr className="w-100"/>
                <div className="d-flex mb-2 justify-content-between">
                    <div>
                        <input type="radio" id="buy" name="buy" value="buy" onChange={handleOption} />
                        <label>Buy</label>
                    </div>
                    <div>
                        <input type="radio" id="buy" name="buy" value="rent" onChange={handleOption} />
                        <label>Rent</label>
                    </div>
                    <div>
                        <input className="w-40px text-center" type="number" min={1} value={count} onChange={handleCount} />
                    </div>
                </div>
                {option === 'rent' && <input className="mb-2" type="date" value={rentDate} min={currentDay} onChange={handleDate}></input>}
                <button disabled={option === ''} onClick={handleAdd}>Add</button>
            </ContentCard>
        </div>
    )
}