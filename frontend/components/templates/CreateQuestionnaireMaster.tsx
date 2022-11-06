import React from 'react'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import RequireBadge from 'components/atoms/RequireBadge'
import QuestionnaireMasterRender from 'components/organisms/QuestionnaireMasterRender'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { titleChanged,
         descriptionChanged,
         showAddFormModalChanged,
         publishStatusChanged } from 'redux/questionnaireMasterSlice'

const CreateQuestionnaireMaster = (): JSX.Element => {
  const dispatch = useDispatch()
  const publishStatus = useSelector((state: RootState) => state.questionnaireMaster.publishStatus)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)

  return (
    <>
      <Form.Label>アンケートのタイトル<RequireBadge></RequireBadge></Form.Label>
      <Form.Control
        value={title}
        onChange={(e) => dispatch(titleChanged(e.target.value))}></Form.Control>
      <Form.Label>アンケートの説明</Form.Label>
      <Form.Control
        value={description}
        onChange={(e) => dispatch(descriptionChanged(e.target.value))}
        as='textarea'
        rows={5}></Form.Control>
      <div className='mt20'>お名前、電話番号、メールアドレスの質問は自動で設定されます。</div>
      <Form.Label className='mt20'>お名前（姓）</Form.Label>
      <Form.Control disabled></Form.Control>
      <Form.Label className='mt20'>お名前（名）</Form.Label>
      <Form.Control disabled></Form.Control>
      <Form.Label className='mt20'>電話番号</Form.Label>
      <Form.Control disabled></Form.Control>
      <Form.Label className='mt20'>メールアドレス</Form.Label>
      <Form.Control disabled></Form.Control>
      <QuestionnaireMasterRender showUpdateQuestionnaireStateIcons={true} />
      <div className='text-center mt30 mb30'>
        <span className='mr10'>質問を追加</span>
        <a onClick={() => dispatch(showAddFormModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
      </div>
      <div>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>公開設定</Form.Label>
              <Form.Select
                placeholder='メニュー名'
                value={publishStatus || 'Unpublish'}
                onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
                <option value='Unpublish'>非公開</option>
                <option value='Publish'>公開</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CreateQuestionnaireMaster
