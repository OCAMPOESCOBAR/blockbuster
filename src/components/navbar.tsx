import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import title from "../assets/lotties/title.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/img/Movies.png"


export const Navbar = () => {
    const {total}: any = useMovieContext();
    const style = {
        width: '200px'
    };

    const navigate = useNavigate();
    const location = useLocation();

    const PrettyButton = styled.div`
    display: flex;
    color: #2770A4;
    justify-content: space-between;
    align-items: center;
    background-color: #c7d1db;
    padding: 10px 40px 10px 40px;
    box-shadow: 5px 5px 5px 0px darkgray;

    .icon-click {
        cursor: pointer;
    }
  `;

    return (
        <PrettyButton>
            <div>
            {location.pathname === '/buy' && <FontAwesomeIcon className="icon-click" icon={faArrowLeft} onClick={() => navigate('/list')}/>}
            </div>
            <div className="icon-click" onClick={() => navigate('/list')}>
                <Lottie animationData={title} style={style}/>
            </div>
            <div className="icon-click" onClick={() => navigate('/buy')}>
            <FontAwesomeIcon icon={faCartShopping} />                
            {`(${total})`}
            </div>
        </PrettyButton>
    )
}