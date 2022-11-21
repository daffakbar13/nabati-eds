import React from 'react'
import { Container, BoldText, GrayContainer, WhitePaper, Title } from './styled'

export default function LRB({ details }) {
  console.log('details', details)
  return (
    <Container>
      <BoldText>Print Preview - Lembar Penerimaan Barang (LPB)</BoldText>
      <GrayContainer>
        <WhitePaper>
          <Title>LAPORAN RETURN BARANG (LRB)</Title>
        </WhitePaper>
      </GrayContainer>
    </Container>
  )
}
