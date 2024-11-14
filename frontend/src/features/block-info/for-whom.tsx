import { Card } from "antd"
import styled from "styled-components"
import { ReactNode } from "react"

export const ForWhom = (props: {title: any, children: ReactNode}) => {

  return (
    <CardInfo>
      <TitleInfo>
        {props.title}
      </TitleInfo>
      <Text>
        {props.children}
      </Text>
    </CardInfo>
  )
}

const TitleInfo = styled.div`
  color: #0B6623;
  font-size: 22px;
  margin-top: 1vh;
  font-weight: 600;
`
const CardInfo = styled(Card)`
  border-radius: 66px;
  width: 90%;
  height: 120%;
  text-align: center;
  box-shadow: 30px 40px 15px rgba(0, 0, 0, 0.1);
  background-color: #E7F0E9;
`
const Text = styled.div`
  text-align: center;
  margin-top: 6vh;
`