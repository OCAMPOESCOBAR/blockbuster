import styled from "styled-components"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Notification = styled.div`
    margin: 20px;
    padding: 10px;
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    display: flex;
    justify-content: space-between;

    svg {
        cursor: pointer
    }
`

export const Notifications = ({setSuccess}: any) => {
    return (
        <Notification>
            <span>Your purchase was successful!</span>
            <FontAwesomeIcon onClick={() => setSuccess(false)} icon={faXmark} />
        </Notification>
    )
}