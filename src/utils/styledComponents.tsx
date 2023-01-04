import styled from "styled-components";

export const MainContentComponent = styled.div`
height: 100%;
display: flex;
flex-direction: column;
margin-top: 50px;

.pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.pagination-data{
    padding: 0;
    margin: 0;
  }
  .pagination-data li{
    list-style:none;
  }
  .table-filter-info{
    padding : 15px;
  }
  .thead-primary tr th {
      background-color: #5a8dee;
      border-color: #5a8dee;
      color: #fff;
  }
  
  .rc-pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
  }
  .rc-pagination-item,
  .rc-pagination-prev, 
  .rc-pagination-jump-prev, 
  .rc-pagination-jump-next {
      margin-right: 8px;
  }
  
  .rc-pagination-total-text{
    margin-right: 12px;
    cursor: initial;
  }
  
  .rc-pagination-jump-next, 
  .rc-pagination-jump-prev, 
  .rc-pagination-next, 
  .rc-pagination-prev {
      display: inline-block;
      min-width: 28px;
      height: 28px;
      color: rgba(0,0,0,.85);
      font-family: Arial;
      line-height: 28px;
      text-align: center;
      vertical-align: middle;
      list-style: none;
      border-radius: 2px;
      cursor: pointer;
      transition: all .3s;
  }
  .rc-pagination-jump-next button, 
  .rc-pagination-jump-prev button {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #666;
  }
  .rc-pagination-jump-next button:after, 
  .rc-pagination-jump-prev button:after {
      display: block;
      content: "•••";
  }
  .rc-pagination-item, 
  .rc-pagination-prev, 
  .rc-pagination-next, 
  .rc-pagination-total-text {
      min-width: initial;
      height: auto;
      line-height: initial;
      background-color: transparent;
      border: none;
      cursor: pointer;
  }
  .rc-pagination-item a, 
  .rc-pagination-item button, 
  .rc-pagination-prev a, 
  .rc-pagination-prev button, 
  .rc-pagination-next a, 
  .rc-pagination-next button,
  .rc-pagination-total-text a, 
  .rc-pagination-total-text button {
      padding: 6px 8px;
      height: auto;
      min-width: 32px;
      min-height: 32px;
      border-radius: 8px;
      border: 1px solid transparent;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      color: #656f84 !important;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      -moz-transition: 0.3s;
      -o-transition: 0.3s;
  }
  .rc-pagination-item.rc-pagination-item-active a, 
  .rc-pagination-item.rc-pagination-item-active a:hover, 
  .rc-pagination-prev.rc-pagination-item-active a, 
  .rc-pagination-prev.rc-pagination-item-active a:hover, 
  .rc-pagination-next.rc-pagination-item-active a, 
  .rc-pagination-next.rc-pagination-item-active a:hover, 
  .rc-pagination-total-text.rc-pagination-item-active a, 
  .rc-pagination-total-text.rc-pagination-item-active a:hover {
      background-color: #5a8dee;
      border-color: #5a8dee;
      color: #ffffff !important;
  }
  .rc-pagination-item a:hover, 
  .rc-pagination-item button:hover, 
  .rc-pagination-prev a:hover, 
  .rc-pagination-prev button:hover, 
  .rc-pagination-next a:hover, 
  .rc-pagination-next button:hover, 
  .rc-pagination-total-text a:hover, 
  .rc-pagination-total-text button:hover {
      background-color: #eceff5;
      border-color: #eceff5;
  }
  
  .rc-pagination-prev button:after {
    content: "‹‹";
    display: block;
  }
  
  .rc-pagination-next button:after {
    content: "››";
    display: block;
  }
`