import { useLocation } from "react-router-dom"
import { useMovieContext } from "../context/MovieContext";

export const CarBuy = () => {
    const {movies, total}: any = useMovieContext();

    console.log('buyy', movies, total)
    return <div>Car</div>
}