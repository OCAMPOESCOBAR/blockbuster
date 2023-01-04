import Lottie from "lottie-react";
import styled from "styled-components";
import nodata from "../assets/lotties/nodata.json"
import { ClearButton, FinishButton } from './ActionsButtons';
import { Notifications } from "./Notifications";
import { useState } from 'react';

const Container = styled.div`
    max-height: 500px;
    display: flex;
    justify-content: space-around;
    padding: 40px;
`

const TableDetail = styled.div`
    overflow: scroll;

        table {
            border-collapse: collapse;
            min-width: 600px;
            max-width: 100%;
        }

        th, td {
            padding: 1rem 2rem;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        tr {
            background-color: white;
        }

        th {
            font-weight: 700;
            font-size: 16px;
            color: white;
            background: #2770A4;
            position: sticky;
            top: 0;
        }
        
        @media(max-width: 500px) {
            .heading {
            display: none;
            }
            td {
            display: block;
            }
            .car-name {
            background: #eee;
            }
        }
    `

const BuyBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100px;
    background: #c7d1db;
    width: 250px;
    justify-content: space-around;
    font-weight: 700;
    font-size: 16px;
`

const ProductColum = styled.div`
    display: flex;

    img {
        width: 45px;
        height: 60px;
        display: block;
        margin-right: 8px;
    }
`

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const OptionColum = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
        text-transform: capitalize;
    }
`

export const NoData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const styleLottie = {
    width: '200px'
}

export const TableItems = ({ items }: any) => {

    const [success, setSuccess] = useState(false);

    return (
        <div>
           {success && <Notifications setSuccess={setSuccess}/>}
            <Container>
                <TableDetail>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Option</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                if (items.length > 0)
                                    return (
                                        <>
                                            {items.map((i: any) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <ProductColum>
                                                                <img src={i.poster} />
                                                                <ProductInfo>
                                                                    <span><strong>Title: </strong>{i.title}</span>
                                                                    <span><strong>Type: </strong>{i.type}</span>
                                                                    <span><strong>Year: </strong>{i.year}</span>
                                                                </ProductInfo>

                                                            </ProductColum>
                                                        </td>
                                                        <td>
                                                            <OptionColum>
                                                                <span>{i.option}</span>
                                                                {i.option === 'rent' && i.rentDate && <span><strong>Date: </strong>{i.rentDate}</span>}
                                                            </OptionColum>
                                                        </td>
                                                        <td>{i.count}</td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                    )
                                return (
                                    <tr>
                                        <td colSpan={8}>
                                            <NoData>
                                                <Lottie animationData={nodata} style={styleLottie}/>
                                                <h3>...your box is empty <a href="/list">add a movie.</a></h3>
                                            </NoData>
                                        </td>
                                    </tr>
                                )
                            })()}
                        </tbody>
                    </table>
                </TableDetail>
                <BuyBox>
                    <span style={{ "textAlign": "center", "marginBottom": "8px" }}>Actions</span>
                    <ClearButton disabled={items.length === 0}>
                        <span>Clear car</span>
                    </ClearButton>
                    <FinishButton setSuccess={setSuccess} disabled={items.length === 0}>Finish</FinishButton>
                </BuyBox>
            </Container>
        </div>

    )
}