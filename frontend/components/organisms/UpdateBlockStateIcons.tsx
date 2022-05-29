import React from 'react'
import CaretUpSquare from '../atoms/CaretUpSquare'
import CaretDownSquare from '../atoms/CaretDownSquare'
import TrashIcon from '../atoms/TrashIcon'
import { UpdateBlockStateIconsProps } from '../../interfaces/UpdateBlockStateIconsProps'

const UpdateBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  return (
    <>
      <a className='mr10 color-black none-under-decoration'><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration'><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration'><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>ブロックを削除</a>
    </>
  )
}

export default UpdateBlockStateIcons
