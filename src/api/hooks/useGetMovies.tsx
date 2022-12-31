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
                items: action.payload
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
                search: action.payload.search,
                page: action.payload.page,
                __forceRefresh: true
            }

        default:
            return { ...state }
    }
}

export const useGetMovies = (apiKey: any) => {
    const [state, dispatch] = useReducer(reducer, {
        isLoading: false,
        isError: false,
        fulfilled: false,
        items: [],
        search: null,
        page: 1,
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
                                page: state.page
                            }
                        }
                    );
                    dispatch({type: 'SUCCESS',  payload: result.data.Search});
                } catch (e) {
                    dispatch({type: 'FAILURE'});
                }
            })()
    }, [state.__forceRefresh]);
    return [{...state}, (search: any, page: any) => dispatch({type: 'REFRESH', payload: {search, page}})]
}