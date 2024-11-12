import { Card } from "antd"
import styled from "styled-components"
import { ReactNode } from "react"

export const ForWhat = (props: {src: any, children: ReactNode}) => {

  return (
    <CardInfo>
      <img src={props.src}/> <br />
      <Text>
        {props.children}
      </Text>
    </CardInfo>
  )
}

const CardInfo = styled(Card)`
  border-radius: 66px;
  width: 90%;
  height: 110%;
  text-align: center;
  box-shadow: 30px 40px 15px rgba(0, 0, 0, 0.1);
`
const Text = styled.div`
  text-align: center;
  margin-top: 6vh;
`