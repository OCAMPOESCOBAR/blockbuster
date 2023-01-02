import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const {total}: any = useMovieContext();

    const navigate = useNavigate();

    const PrettyButton = styled.div`
    display: flex;
    color: white;
    justify-content: space-between;
    align-items: center;
    background-color: #2770A4;
    padding: 10px;
    box-shadow: 5px 5px 5px 0px lightgray;

    h1 {
        margin: 0;
    }
  `;

    return (
        <PrettyButton>
            <div/>
            <div><h1>Title</h1></div>
            <div onClick={() => navigate('/buy')}>{`Car(${total})`}</div>
        </PrettyButton>
    )
}