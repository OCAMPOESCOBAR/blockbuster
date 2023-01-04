import { createContext, useContext, useMemo, useState } from "react";
import { IMovieAdd } from "../models/Movies.interface";

const MovieContext = createContext(null);

export const useMovieContext = () => {
    {
        return useContext(MovieContext);
    }
};

export const MovieProvider = ({ children }: any) => {
    const list: string | null = localStorage.getItem('movies');
    const items: IMovieAdd[] = list ? JSON.parse(list) : [];
    const total =  items.reduce((acc: number, item: IMovieAdd) => {
        return acc + item?.count;
    }, 0);
    const [movies, setMovies] = useState(items);
    const [pageCount, setPageCount] = useState(0);

    const value: any = useMemo(() => ({
       movies, setMovies, total, pageCount,setPageCount 
      }), [movies, total, pageCount]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )

}