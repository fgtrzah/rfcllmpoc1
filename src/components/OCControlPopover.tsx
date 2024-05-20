import React from 'react'

const OCControlPopover = (props: any) => {
  let content = null
  const handleModelSelect = (event) => {
    event.preventDefault()
    const data: FormData = new FormData(event.target)
    props?.handleselectmodel(data.get('modelid'))
    props?.setoccopen(false)
  }
  switch (props?.occcontent) {
    case 'LLM Selector':
      content = (
        <div>
          Select Model
          <form onSubmit={handleModelSelect}>
            <span>
              <div>
                <input type='radio' name='modelid' value='gpt' />
                <label>GPT</label>
              </div>

              <div>
                <input type='radio' name='modelid' value='llama2' />
                <label>Llama2</label>
              </div>

              <div>
                <input type='radio' name='modelid' value='mistral' />
                <label>Mistral</label>
              </div>
            </span>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )
      break
    default:
      content = null
      break
  }
  return props.open ? (
    <div
      style={{
        position: 'absolute',
        top: 50,
        left: 5,
        border: '1px dashed #b7cbf4',
        zIndex: 99999,
        padding: 10,
        backgroundColor: '#444',
        width: '92%',
      }}
    >
      {props?.children}
      {content}
    </div>
  ) : null
}

export default OCControlPopover
