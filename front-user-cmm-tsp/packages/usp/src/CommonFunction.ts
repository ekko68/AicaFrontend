export function handleImgError(e:any) {
    e.target.src = '/images/main/list_img01.png'
}

export function inputPriceFormat(str:any){
    const comma = (str:any) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str:any) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };