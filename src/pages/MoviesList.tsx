import Lottie from "lottie-react";
import banner from "../assets/lotties/moviebanner.json"
import error from "../assets/lotties/error.json"
import { useGetMovies } from '../api/hooks/useGetMovies';
import { useState, useEffect } from 'react';
import { Spinner } from "../components/spinner";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useMovieContext } from '../context/MovieContext';
import Pagination from "rc-pagination";
import styled from "styled-components";
import { SearchBar } from "../components/searchbar";


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

    const handleSearch = (e: any) => {

        setSearch(e.target.value);
    }

    console.log('hola se', search)


    const searchClick = () => {
        if (search) {
            getMoviesList(search);
        }
    }

    const onChange = (page: any) => {
        setPage(page);
        getMoviesList(search);
    };


    return (
        <div style={{ "height": "90%" }}>
            <SearchBar searchClick={searchClick} setSearch={setSearch} search={search} />
            <div style={{ "marginTop": "20px", "textAlign": "center" }}>
                {/* <input placeholder="Search" type="search" onChange={handleSearch} /> */}
                {/* <button onClick={searchClick}>Search</button> */}
                {(() => {
                    if (moviesListStatus.isLoading)
                        return <Spinner />
                    if (isShowBanner)
                        return (
                        <div style={{ "width": "100%", "height": "90vh", "textAlign": "center", "justifyContent": "center", "display": "flex", "alignItems": "center", "flexDirection": "column" }}>
                            <Lottie animationData={banner} style={style} />
                            <h2 style={{"fontWeight": 700}}>find your movie... let's go!</h2>
                        </div>)
                    if (moviesList.length > 0)
                        return (
                            <>
                                <div style={{ "margin": "20px", "backgroundColor": "white", "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between" }}>
                                    {moviesList.map((item: any, idx: any) => {
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
                            <div style={{ "width": "100%", "height": "90vh", "textAlign": "center", "justifyContent": "center", "display": "flex", "alignItems": "center", "flexDirection": "column" }}>                            <Lottie animationData={error} style={style} />
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

    const handleOption = (e: any) => {
        setOption(e.target.value);
    }

    const handleDate = (e: any) => {
        setRentDay(e.target.value);
    }

    const handleCount = (e: any) => {
        setCount(e.target.value);
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
        const finalItems: any = [...movies, obj];
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