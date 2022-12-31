import Lottie from "lottie-react";
import banner from "../assets/lotties/moviebanner.json"
import { useGetMovies } from '../api/hooks/useGetMovies';
import { useState, useEffect } from 'react';
import { Spinner } from "../components/spinner";
import {useNavigate } from "react-router-dom";


export const MovieList = () => {
    const style = {
        width: 300,
    };
    const navigate = useNavigate()
    const [moviesListStatus, getMoviesList] = useGetMovies("5eec5adc");
    const [search, setSearch] = useState('');
    const [isShowBanner, setIsShowBanner] = useState(true);

    console.log(moviesListStatus);

    useEffect(() => {
        if (!search) {
            setIsShowBanner(true);
        }
    }, [search])

    useEffect(() => {
        if (moviesListStatus.fulfilled) {
            setIsShowBanner(false);
        }
    }, [moviesListStatus.isLoading])

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    }

    const searchClick = () => {
        if (search) {
            getMoviesList(search, 1);
        }
    }

    return (
        <div>
            <div style={{ "marginTop": "20px", "textAlign": "center" }}>
                <input placeholder="Search" type="search" onChange={handleSearch} />
                <button onClick={searchClick}>Search</button>
                <button onClick={() => navigate('/buy', {state: {data: 'hola'}})}>Search</button>

            </div>
            {(() => {
                if (moviesListStatus.isLoading)
                    return <Spinner />
                if (isShowBanner)
                    return <Lottie animationData={banner} style={style} />
                if (moviesListStatus.fulfilled && moviesListStatus.items.length > 0)
                    return (
                        <div style={{"margin": "20px", "backgroundColor": "white", "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between"}}>
                            {moviesListStatus.items.map((item: any, idx: any) => {
                                return (
                                    <div style={{"padding": "20px"}}>
                                        <Movie key={idx} item={item} /> 
                                    </div>
                                )
                            })}
                        </div>
                    )
            })()}
        </div>
    );
}

const Movie = ({ item }: any) => {
    console.log(item)
    return (
        <div>
            <div style={{"display": "flex", "flexDirection": "column", "width": "210px", "border": "1px solid blue", "padding": "10px"}}>
                <div style={{"textAlign": "center"}}>
                    <img src={item.Poster} width={200} />
                </div>
                <span>{`Title: ${item.Title}`}</span>
                <span>{`Type: ${item.Type}`}</span>
                <span>{`Year: ${item.Year}`}</span>
            </div>

        </div>
    )
}