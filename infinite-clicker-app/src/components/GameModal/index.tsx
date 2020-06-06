import React, { PropsWithChildren } from 'react'
import ReactModal from 'react-modal'
import "./styles.scss"
import classNames from 'classnames'
import useSound from 'common/useSound';
import { uiSounds } from 'sounds';
import { noop } from 'lodash';

ReactModal.setAppElement('#root');

interface GameModalProps {
  className?: string
  isOpen: boolean
  isNested?: boolean
  onClose: () => void
  title: string | JSX.Element
  actions?: JSX.Element
  overlayClassName?: string
  noExternalClosing?: boolean
  hideTitle?: boolean
  hideExit?: boolean
}

const GameModal = (props: PropsWithChildren<GameModalProps>) => {
  const { isOpen, isNested, onClose, title, actions, className, overlayClassName, noExternalClosing, hideTitle, hideExit } = props
  const modalClassName = classNames(
    "gameModal",
    className,
    { "nested": isNested }
  )
  const backdropClassName = classNames("gameModalOverlay", overlayClassName)
  const menuCloseSound = useSound(uiSounds.menuClose)

  const onCloseHandler = () => {
    menuCloseSound.play()
    onClose()
  }

  return (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={noExternalClosing ? noop : onCloseHandler}
      className={modalClassName}
      overlayClassName={backdropClassName}
    >
      {!hideTitle &&
        <div className="title">
          {title}
          {!hideExit && 
            <i className="fas fa-times" onClick={() => onCloseHandler()}/>
          }
        </div>
      }
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