/*
    [USP]     : App Config Type For Route
    작성자    :   navycui
    작성일    :   2022/05/08
*/
// 미들웨어 유형
export type MiddlewareType = 'auth' | 'factor'; 
// 레이아웃 유형
export type LayoutType = 'studio' | 'promotion' | 'space' | 'paper'| 'empty';
// 라우터 유형
export type RouteType = {
    label?: string;
    layout?: LayoutType;
    element?: any;
    path?: string;
    index?: boolean;
    middleware?: string[];
    children?: RouteType[];
};
// 라우터 props 유형
export type PropsType = {
    name: LayoutType;
    label: string;
    middleware?: string[];
    children: any;
  };