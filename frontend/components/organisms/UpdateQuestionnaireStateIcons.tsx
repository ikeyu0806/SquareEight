import React from 'react'
import CaretUpSquare from 'components/atoms/CaretUpSquare'
import CaretDownSquare from 'components/atoms/CaretDownSquare'
import TrashIcon from 'components/atoms/TrashIcon'
import { UpdateQuestionnaireStateIconsProps } from 'types/UpdateQuestionnaireStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'
import { questionnaireMasterItemsChanged } from 'redux/questionnaireMasterSlice'

const UpdateQuestionnaireStateIcons = ({ questionId, sortOrder }: UpdateQuestionnaireStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const currentMaxSortOrder = useSelector((state: RootState) => state.questionnaireMaster.currentMaxSortOrder)

  const moveUpQuestionnaire = () => {
    let updatequestionnaireMasterItemsState: QuestionnaireMasterItem[]
    const decrementSortOrder = sortOrder - 1
    if (decrementSortOrder < 1) { return true }
    let moveDownQuestionnaireMasterItems = questionnaireMasterItems.find(content => content.sortOrder === sortOrder)
    let moveUpQuestionnaireMasterItems = questionnaireMasterItems.find(content => content.sortOrder === decrementSortOrder)
    updatequestionnaireMasterItemsState = questionnaireMasterItems.filter(content => content.sortOrder !== sortOrder)
    updatequestionnaireMasterItemsState = updatequestionnaireMasterItemsState.filter(content => content.sortOrder !== decrementSortOrder)
    dispatch(questionnaireMasterItemsChanged(updatequestionnaireMasterItemsState))
    if (moveDownQuestionnaireMasterItems !== undefined) {
      let updatemoveDownQuestionnaireMasterItems = { question: moveDownQuestionnaireMasterItems.question,
        formType: moveDownQuestionnaireMasterItems.formType,
        sortOrder: decrementSortOrder,
        questionId: moveDownQuestionnaireMasterItems.questionId,
        textFormRowCount: moveDownQuestionnaireMasterItems.textFormRowCount,
        selectFormAnswers: moveDownQuestionnaireMasterItems.selectFormAnswers,
        radioButtonAnswers: moveDownQuestionnaireMasterItems.radioButtonAnswers,
        checkboxAnswers: moveDownQuestionnaireMasterItems.checkboxAnswers }
      updatequestionnaireMasterItemsState = [...updatequestionnaireMasterItemsState, updatemoveDownQuestionnaireMasterItems]
    }
    if (moveUpQuestionnaireMasterItems !== undefined) {
      let updatemoveUpQuestionnaireMasterItems = { question: moveUpQuestionnaireMasterItems.question,
        formType: moveUpQuestionnaireMasterItems.formType,
        sortOrder: sortOrder,
        questionId: moveUpQuestionnaireMasterItems.questionId,
        textFormRowCount: moveUpQuestionnaireMasterItems.textFormRowCount,
        selectFormAnswers: moveUpQuestionnaireMasterItems.selectFormAnswers,
        radioButtonAnswers: moveUpQuestionnaireMasterItems.radioButtonAnswers,
        checkboxAnswers: moveUpQuestionnaireMasterItems.checkboxAnswers }
      updatequestionnaireMasterItemsState = [...updatequestionnaireMasterItemsState, updatemoveUpQuestionnaireMasterItems]
    }
    dispatch(questionnaireMasterItemsChanged(updatequestionnaireMasterItemsState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
  }

  const moveDownQuestionnaire = () => {
    let updatequestionnaireMasterItemsState: QuestionnaireMasterItem[]
    const incrementSortOrder = sortOrder + 1
    if (incrementSortOrder > currentMaxSortOrder) { return true }
    let moveUpQuestionnaireMasterItems = questionnaireMasterItems.find(content => content.sortOrder === sortOrder)
    let moveDownQuestionnaireMasterItems = questionnaireMasterItems.find(content => content.sortOrder === incrementSortOrder)
    updatequestionnaireMasterItemsState = questionnaireMasterItems.filter(content => content.sortOrder !== sortOrder)
    updatequestionnaireMasterItemsState = updatequestionnaireMasterItemsState.filter(content => content.sortOrder !== incrementSortOrder)
    dispatch(questionnaireMasterItemsChanged(updatequestionnaireMasterItemsState))
    if (moveUpQuestionnaireMasterItems !== undefined) {
      let updatemoveUpQuestionnaireMasterItems = { question: moveUpQuestionnaireMasterItems.question,
        formType: moveUpQuestionnaireMasterItems.formType,
        sortOrder: incrementSortOrder,
        questionId: moveUpQuestionnaireMasterItems.questionId,
        textFormRowCount: moveUpQuestionnaireMasterItems.textFormRowCount,
        selectFormAnswers: moveUpQuestionnaireMasterItems.selectFormAnswers,
        radioButtonAnswers: moveUpQuestionnaireMasterItems.radioButtonAnswers,
        checkboxAnswers: moveUpQuestionnaireMasterItems.checkboxAnswers }
      updatequestionnaireMasterItemsState = [...updatequestionnaireMasterItemsState, updatemoveUpQuestionnaireMasterItems]
    }
    if (moveDownQuestionnaireMasterItems !== undefined) {
      let updatemoveUpQuestionnaireMasterItems = { question: moveDownQuestionnaireMasterItems.question,
        formType: moveDownQuestionnaireMasterItems.formType,
        sortOrder: sortOrder,
        questionId: moveDownQuestionnaireMasterItems.questionId,
        textFormRowCount: moveDownQuestionnaireMasterItems.textFormRowCount,
        selectFormAnswers: moveDownQuestionnaireMasterItems.selectFormAnswers,
        radioButtonAnswers: moveDownQuestionnaireMasterItems.radioButtonAnswers,
        checkboxAnswers: moveDownQuestionnaireMasterItems.checkboxAnswers }
      updatequestionnaireMasterItemsState = [...updatequestionnaireMasterItemsState, updatemoveUpQuestionnaireMasterItems]
    }
    dispatch(questionnaireMasterItemsChanged(updatequestionnaireMasterItemsState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
  }

  const deleteQuestionnaire = () => {
    let updatequestionnaireMasterItemsState: QuestionnaireMasterItem[]
    updatequestionnaireMasterItemsState = questionnaireMasterItems.filter(content => content.questionId !== questionId)
    dispatch(questionnaireMasterItemsChanged(updatequestionnaireMasterItemsState))
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration' onClick={moveUpQuestionnaire}><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration' onClick={moveDownQuestionnaire}><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={deleteQuestionnaire}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>質問を削除</a>
      <br/>
    </>
  )
}

export default UpdateQuestionnaireStateIcons
