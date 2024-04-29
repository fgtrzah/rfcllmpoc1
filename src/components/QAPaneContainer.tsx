import { useState } from 'react'
import { Drawer } from '.'
import { useOmniChat, useStore } from 'src/state'

const QAPaneContainer = () => {
  const [store] = useStore()
  const { omniChatPanel } = store
  const { toggleQAPanel } = useOmniChat()
  return (
    <div>
      <Drawer isOpen={omniChatPanel.active} onClose={toggleQAPanel}>
        <p>QA Panel</p>
      </Drawer>
    </div>
  )
}

export default QAPaneContainer
