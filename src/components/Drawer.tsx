import React from 'react'
import styles from './Drawer.module.css'
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
        X
      </div>
      <div className={styles.Content}>{children}</div>
    </div>
  )
}

export { DrawerDirection }
export default Drawer
