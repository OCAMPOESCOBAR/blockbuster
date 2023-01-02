import axios from "axios";
import { useEffect, useReducer } from "react"

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                isLoading: true,
                __forceRefresh: false
            };
        case 'SUCCESS':
            return {
                ...state,
                isLoading: false,
                fulfilled: true,
                items: action.payload.data,
                totalResults: action.payload.totalResults
            }
        case 'FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case 'REFRESH':
            return {
                ...state,
                isLoading: true,
                isError: false,
                fulfilled: false,
                items: [],
                search: action.payload,
                __forceRefresh: true
            }

        default:
            return { ...state }
    }
}

export const useGetMovies = (apiKey: any, page: any) => {
    const [state, dispatch] = useReducer(reducer, {
        isLoading: false,
        isError: false,
        fulfilled: false,
        items: [],
        search: null,
        __forceRefresh: false
    });

    useEffect(() => {
        if(state.__forceRefresh)
            (async () => {
                dispatch({type: 'INIT'});
                try {
                    const result = await axios.get(
                        'http://www.omdbapi.com/',
                        {
                            params: {
                                apiKey,
                                s: state.search,
                                page: page
                            }
                        }
                    );
                    dispatch({type: 'SUCCESS',  payload: {data: result.data.Search, totalResults: result.data.totalResults}});
                } catch (e) {
                    dispatch({type: 'FAILURE'});
                }
            })()
    }, [state.__forceRefresh, page]);
    return [{...state}, (search: any, page: any) => dispatch({type: 'REFRESH', payload: search})]
}