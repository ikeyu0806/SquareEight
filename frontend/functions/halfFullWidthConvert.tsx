export const convertHalfWidthToFullWidth = (halfWidthText: string)  => {
  return halfWidthText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
})
}
