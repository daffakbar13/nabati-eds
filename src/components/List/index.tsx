/* eslint-disable function-paren-newline */
import React from 'react'
import { ListContainer, Title, Label, ItemContainer, Blur } from './styled'

interface Props {
  label: string
  value: React.ReactNode
  loading?: boolean
}

export default function List({ children, loading }) {
  return (
    <ListContainer>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          loading,
          ...child.props,
        }),
      )}
    </ListContainer>
  )
}

function Item({ label, value, loading }: Props) {
  return (
    <ItemContainer>
      <Title>
        {label}
        <span style={{ marginRight: 8 }}>{label && <>:</>}</span>{' '}
      </Title>
      <Label>
        {loading && <Blur>loading...</Blur>} {value || (label ? '-' : '')}
      </Label>
    </ItemContainer>
  )
}

List.Item = Item
