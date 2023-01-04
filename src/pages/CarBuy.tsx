import { TableItems } from "../components/TableItems";
import { useMovieContext } from "../context/MovieContext";

export const CarBuy = () => {
    const { movies }: any = useMovieContext();

    return (
       <TableItems items={movies}/>
    )
}