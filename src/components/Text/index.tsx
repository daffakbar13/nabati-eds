import styled from 'styled-components'

export const Label = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`

const LabelRequired = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;

  &:after {
    content: ' *';
    color: red;
  }
`

export default { Label, LabelRequired }
