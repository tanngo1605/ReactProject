import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const OptionsContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContrainer = styled.div`
  height: 70px;
  width: 110%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
  transition: 1s;
  top: 0px;
  position: absolute;
  right: 10px;
  z-index: 1;
  margin-top: 0.5em;
  font-weight: bold;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 20px;
  align-items: center;
  margin-left: 200px;
  .logo:hover {
    transform: rotate(720deg);
    transition: 10s;
  }
  .logo {
    transform: rotate(-720deg);
    transition: 10s;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end; /*most right side*/
`;

export const OptionLink = styled(Link)`
  ${OptionsContainerStyles}
  &:hover {
    padding: 10px 15px;
    cursor: pointer;
    color: wheat;
    transition: 1s;
  }
`;

export const OptionDiv = styled.div`
  ${OptionsContainerStyles}
`;
