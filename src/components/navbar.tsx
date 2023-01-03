import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import title from "../assets/lotties/title.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/img/Movies.png"


export const Navbar = () => {
    const {total}: any = useMovieContext();
    const style = {
        width: '200px'
    };

    const navigate = useNavigate();

    const PrettyButton = styled.div`
    display: flex;
    color: #2770A4;
    justify-content: space-between;
    align-items: center;
    background-color: #c7d1db;
    padding: 10px;
    box-shadow: 5px 5px 5px 0px darkgray;
  `;

    return (
        <PrettyButton>
            <div/>
            <div style={{"display": "flex"}}>
                <Lottie animationData={title} style={style}/>
                {/* <Lottie animationData={car} style={style}/> */}
            </div>
            <div onClick={() => navigate('/buy')}>
            <FontAwesomeIcon icon={faCartShopping} />                
            {`(${total})`}
            </div>
        </PrettyButton>
    )
}