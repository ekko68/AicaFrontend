export interface MenuItem {
  systemId: string;
  menuId: string;
  menuNm: string;
  url: string;
  newWindow: Boolean;
  parentMenuId: string | null;
  sortOrder: number;
  remark: string | null;
}

//문서에는 CHILD, ABOVE, BELOW 3가지 옵션이 존재하지만 리스트가 테이블로 구성이 되어이어서 CHILD로 고정
type Relation = 'CHILD';

export interface AddMenuData extends MenuItem {
  baseMenuId: string;
  relation: Relation;
}
