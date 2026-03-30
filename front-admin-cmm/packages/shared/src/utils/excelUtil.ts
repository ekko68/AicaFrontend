import * as XLSX from 'xlsx';

interface WorkBookCallBack {
  (workbook: XLSX.WorkBook): void
}

const fixdata = (data: any) => {
  let o: string = '', l = 0, w = 10240
  for(; l < data.byteLength / w; ++l){
    // @ts-ignore
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, 1 * w + w)))
  }
  // @ts-ignore
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))

  return o
}

export const readExcelFile = (file: File, callback: WorkBookCallBack) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = (e) => {
    const data = e.target?.result
    const arr = fixdata(data)
    const workbook = XLSX.read(btoa(arr), {type: 'base64'})
    callback(workbook)
  }
}

export const workbookToJsonArray = (workbook: XLSX.WorkBook) => {
  let jArray = new Array()
  workbook.SheetNames.forEach((sheetName) => {
    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {})
    if (roa.length > 0) jArray.push(roa)
  })
  return jArray[0]
}