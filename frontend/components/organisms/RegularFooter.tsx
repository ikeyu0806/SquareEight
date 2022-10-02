import React from 'react'

const RegularFooter = (): JSX.Element => {
  return (
    <footer className='content text-center'>
      <hr />
      <p className='footer-margin'>
        
        Copyright <a href='/administrator'>SquareEight Administrator</a> {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default RegularFooter
