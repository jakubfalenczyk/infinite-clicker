import React, { PropsWithChildren } from 'react'
import ReactModal from 'react-modal'
import "./styles.scss"
import classNames from 'classnames'

ReactModal.setAppElement('#root');

interface GameModalProps {
  className?: string
  isOpen: boolean
  isNested?: boolean
  onClose: () => void
  title: string | JSX.Element
  actions?: JSX.Element
}

const GameModal = (props: PropsWithChildren<GameModalProps>) => {
  const { isOpen, isNested, onClose, title, actions, className } = props
  const modalClassName = classNames(
    "gameModal",
    className,
    { "nested": isNested }
  ) 

  return (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalClassName}
      overlayClassName="gameModalOverlay"
    >
      <div className="title">
        {title}
      </div>
      <div className="content">
        {props.children}
      </div>
      {actions &&
        <div className="actions">
          {actions}
        </div>
      }
    </ReactModal>
  )
}

export default GameModal