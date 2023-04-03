import styled from "styled-components";

export const Nav = styled.div`
    height: 5rem;
    width: 100%;
    background: rgba(33, 33, 33, 0.8);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;

    position: absolute;
    z-index: 1;
`

export const NavTitle = styled.div`
margin-left : 15.6rem;
margin-right: 50%;
font-weight: 600;
font-size: 2.2rem;
letter-spacing: -0.02em;
color: #1DF659;
`

export const NavBtnWrapper = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    height: 0.1rem;
    display: table;
    margin-left: 2%;
`

export const NavBtn = styled.button`
background: rgba(255, 255, 255, 0.3);
border: 1px solid #1DF659;
border-radius: 5px;
font-weight: 500;
font-size: 1.1rem;
color: #FFFFFF;
display: table-row;
margin: 0.3rem 0.4rem;
`