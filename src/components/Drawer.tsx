import React from 'react'
import styles from './Drawer.module.css'
import { CloseIcon } from '.'
enum DrawerDirection {
  Left = 'Left',
  Right = 'Right',
}

type Props = {
  isOpen: boolean
  children: React.ReactNode
  direction?: DrawerDirection
  onClose: () => void
}

const Drawer = ({
  isOpen,
  children,
  direction = DrawerDirection.Right,
  onClose,
}: Props) => {
  const classNames = `${styles.Drawer} ${styles[direction]} ${
    isOpen ? styles.Open : ''
  }`

  return (
    <div className={classNames}>
      <div className={styles.Close} onClick={onClose}>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            appearance: 'none',
            color: '#b7cbf4',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={styles.Content}>{children}</div>
    </div>
  )
}

export { DrawerDirection }
export default Drawer
