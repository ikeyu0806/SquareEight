import React from 'react'

const RegularFooter = (): JSX.Element => {
  return (
    <footer className='content text-center'>
      <p className='footer-margin mt20'>
        Copyright SquareEight.Inc {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default RegularFooter
