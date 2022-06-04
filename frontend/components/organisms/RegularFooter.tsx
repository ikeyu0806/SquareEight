import React from 'react'

const RegularFooter = (): JSX.Element => {
  return (
    <footer className='content text-center'>
      <hr />
      <p className='footer-margin'>Copyright SmartLesson {new Date().getFullYear()}</p>
    </footer>

  )
}

export default RegularFooter
