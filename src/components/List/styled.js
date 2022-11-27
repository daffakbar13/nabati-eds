import styled from 'styled-components'

export const ListContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: repeat(3, minmax(200px, 500px));
  /* grid-template-columns: repeat(auto-fill, 400px); */
  /* grid-template-rows: repeat(auto-fill, 1fr); */
  gap: 14px;
`
export const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 200px) minmax(100px, 1fr);
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
`
export const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
`

export const Blur = styled.span`
  opacity: 0.5;
  margin-left: 16px;
`
