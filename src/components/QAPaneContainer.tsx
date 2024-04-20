import { useState } from 'react'
import { Drawer } from '.'

const QAPaneContainer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <div>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <p>Drawer</p>
      </Drawer>
    </div>
  )
}

export default QAPaneContainer
