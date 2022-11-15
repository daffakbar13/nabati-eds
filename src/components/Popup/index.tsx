import React from 'react'

interface PopupProps {
  children?: React.ReactNode,
  onOutsideClick?: () => void
  gap?: number
}

const useOutsideClick = (ref, handleOutsideClick) => {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOutsideClick()
      }
    }
    document.addEventListener('click', handleClickOutside);
  }, [handleOutsideClick, ref])
}

export default function Popup(props: PopupProps) {
  const { children, onOutsideClick, gap } = props
  const wrapper = React.useRef(null)
  useOutsideClick(wrapper, onOutsideClick)

  return (
    <div
      style={{
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'fixed',
        backgroundColor: '#00000073',
        zIndex: 800,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          // bottom: '50%',
          // right: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 900,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          // width: 780,
        }}
        {...(onOutsideClick && { ref: wrapper })}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: gap || 10 }}>{children}</div>
      </div>
    </div>
  )
}
