import { useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;

    .search-bar {
        position: absolute;
        display: flex;
        background: #2770A4;
        width: 500px;
        height: 40px;
        padding: 0.2rem 0.6rem 0.2rem 0.2rem;  
        box-sizing: border-box;
        box-shadow: 1px 1px 0 0 black,
                    2px 2px 0 0 black,
                    3px 3px 0 0 black,
                    4px 4px 0 0 black,
                    5px 5px 0 0 black,
                    6px 6px 0 0 black
      }
      
      .search-bar input {
        border: 0;
        outline: none;
        height: 100%;
        width: 90%;
        padding: 0 1rem;
        font-size: 1rem;
        font-style: italic;
      }
      
      .search-bar button {
        margin-left: auto;
        background: none;
        border: none;
        color: white;
        font-weight: bolder;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        outline: none;
      }
  `;

export const SearchBar = ({searchClick, search, setSearch}: any) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{ 
    e.preventDefault()
      setSearch(e.target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchClick();
    }
  };

    return (
        <Wrapper>
            <div className="search-bar">
                <input type="search" onKeyDown={keyDownHandler} onChange={onChange} value={search} placeholder="enter your search terms here" />
                <button onClick={searchClick}>go!</button>
            </div>
        </Wrapper>
    )
}