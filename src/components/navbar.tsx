import styled from "styled-components";

export const Navbar = () => {

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
            <div>Car(0)</div>
        </PrettyButton>
    )
}