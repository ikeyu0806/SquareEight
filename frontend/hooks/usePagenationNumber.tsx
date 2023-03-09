import { useEffect, useState } from 'react'

export const usePagenationNumber = (currentPage: number, lastPage: number) => {
  const [firstPagenationNum, setFirstPagenationNum] = useState(1)
  const [secondPagenationNum, setSecondPagenationNum] = useState(2)
  const [thirdPagenationNum, setThirdPagenationNum] = useState(3)
  const [forthPagenationNum, setForthPagenationNum] = useState(4)
  const [fifthPagenationNum, setFifthPagenationNum] = useState(5)

  useEffect(() => {
    setFirstPagenationNum(currentPage < 3 ? 1 : currentPage - 2)
    setSecondPagenationNum(currentPage < 4 ? 2 : currentPage - 1)

    let thirdNum = 3
    if (currentPage === 1) {
      thirdNum = currentPage + 2
    } else if (currentPage === 2) {
      thirdNum = currentPage + 1
    } else if (currentPage === lastPage - 1) {
      thirdNum = lastPage - 1
    } else if (currentPage === lastPage) {
      thirdNum = lastPage
    } else {
      thirdNum = currentPage
    }
    setThirdPagenationNum(thirdNum)

    let forthNum = 4
    console.log("!!!!currentPage", currentPage, currentPage === 1, currentPage === 1 || (currentPage === 2 && lastPage < 5))
    if (currentPage === 1 || (currentPage === 2 && lastPage < 5)) {
      forthNum = 4
    } else if (currentPage === 2) {
      forthNum = 5
    } else if (currentPage === lastPage - 2) {
      forthNum = lastPage - 1
    } else {
      forthNum = currentPage + 1
    }
    console.log("!!forthNum", forthNum)
    setForthPagenationNum(forthNum)

    let fifthNum = 5
    if (currentPage === 1) {
      fifthNum = 5
    } else if (currentPage === 2) {
      fifthNum = 6
    } else if (currentPage === lastPage) {
      fifthNum = lastPage
    } else {
      fifthNum = currentPage + 2
    }
    setFifthPagenationNum(fifthNum)
  }, [currentPage, lastPage])

  return [
    firstPagenationNum,
    secondPagenationNum,
    thirdPagenationNum,
    forthPagenationNum,
    fifthPagenationNum
  ]
}
