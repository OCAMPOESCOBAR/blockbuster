import Lottie from "lottie-react";
import banner from "../assets/lotties/moviebanner.json"
import error from "../assets/lotties/error.json"
import { useGetMovies } from '../api/hooks/useGetMovies';
import { useState, useEffect } from 'react';
import { Spinner } from "../components/spinner";
import moment from "moment";
import { useMovieContext } from '../context/MovieContext';
import Pagination from "rc-pagination";
import styled from "styled-components";
import { SearchBar } from "../components/searchbar";
import { IMovie, IMovieAdd } from "../models/Movies.interface";


export const MovieList = () => {
    const style = {
        height: '400px'
    };

    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [moviesListStatus, getMoviesList] = useGetMovies("5eec5adc", page);
    const [moviesList, setMoviesList] = useState([]);
    const [search, setSearch] = useState('');
    const [isShowBanner, setIsShowBanner] = useState(true);
    const [isSearchClick, setIsSearchClick] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    console.log('hola page', page)

    useEffect(() => {
        if (!search) {
            setIsShowBanner(true);
            setMoviesList([]);
        }
    }, [search])

    useEffect(() => {
        if (moviesListStatus.fulfilled) {
            setMoviesList(moviesListStatus.items);
            setTotalResults(moviesListStatus.totalResults);
            setIsShowBanner(false);
        }
        if (moviesListStatus.isError) {
            setIsShowBanner(false);
        }
    }, [moviesListStatus.isLoading])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value);
    }

    console.log('hola se', search)


    const searchClick = () => {
        if (search) {
            getMoviesList(search);
        }
    }

    const onChange = (page: number) => {
        setPage(page);
        getMoviesList(search);
    };


    return (
        <div className="display-flex" style={{ "marginTop": "50px" }}>
            <SearchBar searchClick={searchClick} setSearch={setSearch} search={search} />
            <div className="display-flex" style={{ "marginTop": "20px", "textAlign": "center" }}>
                {/* <input placeholder="Search" type="search" onChange={handleSearch} /> */}
                {/* <button onClick={searchClick}>Search</button> */}
                {(() => {
                    if (moviesListStatus.isLoading)
                        return <Spinner />
                    if (isShowBanner)
                        return (
                        <div className="display-flex" style={{ "textAlign": "center", "justifyContent": "center", "alignItems": "center" }}>
                            <Lottie animationData={banner} style={style} />
                            <h2 style={{"fontWeight": 700}}>find your movie... let's go!</h2>
                        </div>)
                    if (moviesList.length > 0)
                        return (
                            <>
                                <div style={{ "margin": "20px", "backgroundColor": "white", "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between" }}>
                                    {moviesList.map((item: IMovie, idx: number) => {
                                        return (
                                            <div key={idx} style={{ "padding": "20px" }}>
                                                <Movie key={idx} item={item} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    if (moviesListStatus.isError)
                        return (
                            <div className="display-flex" style={{ "textAlign": "center", "justifyContent": "center", "alignItems": "center" }}> 
                                <Lottie animationData={error} style={style} />
                                <h2 style={{"fontWeight": 700}}>{moviesListStatus.errorMsg}</h2>
                            </div>)

                })()}
                {moviesList.length > 0 &&
                    <div>
                        <Pagination
                            className="pagination-data"
                            onChange={onChange}
                            current={page}
                            total={totalResults}
                        />
                    </div>}
            </div>
        </div>
    );
}

const Movie = ({ item }: any) => {
    const { movies, setMovies }: any = useMovieContext();

    const currentDay = moment().format('YYYY-MM-DD');
    const [option, setOption] = useState('');
    const [rentDate, setRentDay] = useState(currentDay);
    const [count, setCount] = useState(1);

    const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value);
    }

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRentDay(e.target.value);
    }

    const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        let index;
        if (obj.option === 'buy') {
            index = movies.findIndex((e: IMovieAdd) => e.id === obj.id && e.option === obj.option);
        } else {
            index = movies.findIndex((e: IMovieAdd) => e.id === obj.id && e.option === obj.option && e.rentDate === obj.rentDate);
        }
        let finalItems: IMovieAdd[] = []
        if (index !== -1) {
            finalItems = [...movies];
            finalItems[index].count = finalItems[index].count + obj.count;
        } else {
            finalItems = [...movies, obj];
        }
        localStorage.setItem('movies', JSON.stringify(finalItems));
        setMovies(finalItems);
    }


    return (
        <div>
            <div style={{ "display": "flex", "flexDirection": "column", "width": "210px", "border": "1px solid blue", "padding": "10px" }}>
                <div style={{ "textAlign": "center" }}>
                    <img src={item.Poster} width={200} />
                </div>
                <span title={item.Title} style={{ "textOverflow": "ellipsis", "overflow": "hidden", "whiteSpace": "nowrap" }}>{`Title: ${item.Title}`}</span>
                <span>{`Type: ${item.Type}`}</span>
                <span>{`Year: ${item.Year}`}</span>
                <hr style={{ "width": "100%" }} />
                <div style={{ "display": "flex" }}>
                    <div>
                        <input type="radio" id="huey" name="drone" value="buy" onChange={handleOption} />
                        <label>Buy</label>
                    </div>
                    <div>
                        <input type="radio" id="dewey" name="drone" value="rent" onChange={handleOption} />
                        <label>Rent</label>
                    </div>
                </div>

                {option === 'rent' && <input type="date" value={rentDate} min={currentDay} onChange={handleDate}></input>}
                <div style={{ "display": "flex" }}>
                    <input type="number" min={1} value={count} onChange={handleCount} />
                    <button onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    )
}