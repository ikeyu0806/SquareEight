import React from 'react'

const RegularFooter = (): JSX.Element => {
  return (
    <footer className='content text-center'>
      <p className='footer-margin mt20'>
        Copyright <a href='/administrator'>SquareEight Administrator</a> {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default RegularFooter
