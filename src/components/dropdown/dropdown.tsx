import React from 'react'
import { Container, Title, Content, Item, Divider } from './dropdown-components'

export default function DropDown({ children, title, placement }: any) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [dropDownTitle, setDropDownTitle] = React.useState(title)

  function handleWindowClick(event: any) {
    if (!event.target.closest('.dropdown') && !event.target.closest('.dropdown-container')) {
      setIsVisible(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleWindowClick)
    return () => {
      document.removeEventListener('click', handleWindowClick)
    }
  })

  React.useEffect(() => {
    setDropDownTitle(title)
  }, [title])

  return (
    <Container
      className="dropdown-container"
      onClick={() => {
        setIsVisible(!isVisible)
      }}>
      <Title>{dropDownTitle}</Title>
      {isVisible && (
        <Content className="dropdown" placement={placement}>
          {children}
        </Content>
      )}
    </Container>
  )
}

DropDown.Item = Item
DropDown.Divider = Divider
