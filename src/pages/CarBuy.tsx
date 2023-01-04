import { TableItems } from "../components/TableItems";
import { useMovieContext } from "../context/MovieContext";

export const CarBuy = () => {
    const { movies, total }: any = useMovieContext();

    return (
       <TableItems items={movies}/>
    )
}