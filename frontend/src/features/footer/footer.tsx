import { styled } from "styled-components"
import logo from '@public/logo.svg'

export const Footer = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <CreateBy>
        Created by Pixel Pundits © {new Date().getFullYear()}
      </CreateBy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  border-top: 2px solid #0B6623; 
  background-color: #F5F5F5;
  justify-content: center;
`
const CreateBy = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  color: #0B6623;
`