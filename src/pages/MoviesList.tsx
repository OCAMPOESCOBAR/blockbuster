import Lottie from "lottie-react";
import banner from "../assets/lotties/moviebanner.json"
import error from "../assets/lotties/error.json"
import { useGetMovies } from '../api/hooks/useGetMovies';
import { useState, useEffect } from 'react';
import { Spinner } from "../components/spinner";
import Pagination from "rc-pagination";
import styled from "styled-components";
import { SearchBar } from "../components/searchbar";
import { IMovie } from "../models/Movies.interface";
import { MovieCard } from "../components/MovieCard";
import { MainContentComponent } from "../utils/styledComponents";

const BodyContentComponent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    text-align: center;
    justify-content: center;
`

const LottieComponent = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    h2 {
        font-weight: 700;
    }
`

const ListContent = styled.div`
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1400px;
`


export const MovieList = () => {
    const style = {
        height: '400px'
    };

    const [page, setPage] = useState(1);
    const [moviesListStatus, getMoviesList] = useGetMovies("5eec5adc", page);
    const [moviesList, setMoviesList] = useState([]);
    const [search, setSearch] = useState('');
    const [isShowBanner, setIsShowBanner] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        if (!search) {
            setIsShowBanner(true);
            setMoviesList([]);
            setPage(1);
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
        <MainContentComponent>
            <SearchBar searchClick={searchClick} setSearch={setSearch} search={search} />
            <BodyContentComponent>
                {(() => {
                    if (moviesListStatus.isLoading)
                        return <Spinner />
                    if (isShowBanner)
                        return (
                            <LottieComponent>
                                <Lottie animationData={banner} style={style} />
                                <h2>find your movie... let's go!</h2>
                            </LottieComponent>
                        )
                    if (moviesList.length > 0)
                        return (
                            <>
                                <ListContent>
                                    {moviesList.map((item: IMovie, idx: number) => {
                                        return (
                                            <div key={idx} style={{ "padding": "20px" }}>
                                                <MovieCard key={idx} item={item} />
                                            </div>
                                        )
                                    })}
                                </ListContent>
                            </>
                        )
                    if (moviesListStatus.isError)
                        return (
                            <LottieComponent>
                                <Lottie animationData={error} style={style} />
                                <h2>{moviesListStatus.errorMsg}</h2>
                            </LottieComponent>)

                })()}
                {moviesList.length > 0 &&
                    <div className="pagination">
                        <Pagination
                            className="pagination-data"
                            onChange={onChange}
                            current={page}
                            total={totalResults}
                        />
                    </div>}
            </BodyContentComponent>
        </MainContentComponent>
    );
}