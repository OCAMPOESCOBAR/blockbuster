import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MovieContext = createContext(null);

export const useMovieContext = () => {
    {
        return useContext(MovieContext);
    }
};

export const MovieProvider = ({ children }: any) => {
    const list: any = localStorage.getItem('movies');
    const items: any = localStorage.getItem('movies') !== null ? JSON.parse(list) : [];
    const total =  items.reduce((acc: any, item: any) => {
        return acc + parseInt(item?.count);
    }, 0)
    const [movies, setMovies] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const value: any = useMemo(() => ({
       movies, setMovies, total, pageCount,setPageCount 
      }), [movies, total, pageCount]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )

}