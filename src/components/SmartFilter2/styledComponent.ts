import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 156px 32px 1fr 56px 1fr;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`

export const Pane = styled.div`
  cursor: pointer;
`

export const HeaderList = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  margin-top: 24px;
  background-color: #f4f4f4;
  padding: 0;
  height: 64px;
  /* place-items: center; */
  align-items: center;
  border-radius: 8px 8px 0px 0px; ;
`

interface ListProps {
  active: boolean
}

export const List = styled.div<ListProps>`
  padding: 12px 0;
  border-bottom: 1px solid #aaaaaa80;
  display: grid;
  grid-template-columns: 100px 3fr 50px;
  gap: 16px;
  align-items: center;
  transition: all 0.3s;
  background-color: ${(props) => (props.active ? '#f4fcfc' : 'white')};
  cursor: pointer;

  &:hover {
    background-color: #f4fcfc;
  }
`

export const FooterPane = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`
