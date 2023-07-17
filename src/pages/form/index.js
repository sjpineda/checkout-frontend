import React from 'react'
import JotFormReact from 'jotform-react'

export default function Form(props) {
  const handleSubmit = (e) => {
    // console.log('thererer----->',e)
    setTimeout(() => {
      let string = document.querySelectorAll('.wrapper')[0]
      console.log(string)
    }, 5000)
  }
  return (
    <div>
      {/*231634627248661*/}
      {/*230123264917047*/}
      <JotFormReact
        formURL="https://form.jotform.com/231634627248661"
        formID="231634627248661" // Required to use multiple forms in same page.
        // onSubmit={(e)=>handleSubmit(e)}
        initialHeight={300} // Form will opens in this size
        autoResize={true} // should form auto-resize
      />
    </div>
  )
}
