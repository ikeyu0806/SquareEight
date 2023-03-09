import { useEffect, useState } from 'react'

export const usePaginationNumber = (currentPage: number, lastPage: number) => {
  const [firstPaginationNum, setFirstPaginationNum] = useState(1)
  const [secondPaginationNum, setSecondPaginationNum] = useState(2)
  const [thirdPaginationNum, setThirdPaginationNum] = useState(3)
  const [forthPaginationNum, setForthPaginationNum] = useState(4)
  const [fifthPaginationNum, setFifthPaginationNum] = useState(5)

  useEffect(() => {
    setFirstPaginationNum(currentPage < 3 ? 1 : currentPage - 2)
    setSecondPaginationNum(currentPage < 4 ? 2 : currentPage - 1)

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
    setThirdPaginationNum(thirdNum)

    let forthNum = 4
    if (currentPage === 1 || (currentPage === 2 && lastPage > 5)) {
      forthNum = 4
    } else if (currentPage === 2) {
      forthNum = 5
    } else if (currentPage === lastPage - 2) {
      forthNum = lastPage - 1
    } else {
      forthNum = currentPage + 1
    }
    setForthPaginationNum(forthNum)

    let fifthNum = 5
    if (currentPage === 1 || (currentPage === 2 && lastPage > 5)) {
      fifthNum = 5
    } else if (currentPage === 2) {
      fifthNum = 6
    } else if (currentPage === lastPage) {
      fifthNum = lastPage
    } else {
      fifthNum = currentPage + 2
    }
    setFifthPaginationNum(fifthNum)
  }, [currentPage, lastPage])

  return [
    firstPaginationNum,
    secondPaginationNum,
    thirdPaginationNum,
    forthPaginationNum,
    fifthPaginationNum
  ]
}
