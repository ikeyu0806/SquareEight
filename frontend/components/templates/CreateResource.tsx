import React from 'react'
import { Table, FormControl } from 'react-bootstrap'

const CreateResource = (): JSX.Element => {
  return (
    <>
      <div className='text-center mt50 mb50'>
        <h3 className='mb15'>リソース登録</h3>
        <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
        <br />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th className=' col-lg-4'>リソース名</th>
            <th className=' col-lg-2'>同時予約受付可能数</th>
            <th className=' col-lg-5'>曜日別予約受付設定</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FormControl
                placeholder='ヨガマット、〇〇先生など'
                aria-label='リソース名'
              />
            </td>
            <td>
              <FormControl
                placeholder='1'
                aria-label='リソース名'
              />
            </td>
            <td>営業時間に準じる
              <a>（変更する）</a><br/>
              <span>月 火 水 木 金 土 日</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default CreateResource
