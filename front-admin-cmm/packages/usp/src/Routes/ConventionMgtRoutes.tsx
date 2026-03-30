import {RouteType} from "~/DynamicRouter";
import {Loader} from "shared/utils/RouteUtiles";
import React from "react";


export const ConventionMgtRoutes: RouteType[] = [
  {
    path: '/Convention/MgtOfContractSigning/BusPlanReceptionMgt/:bsnsPlanDocId/:bsnsSlctnId',
    label: '사업계획서 상세',
    element: (
      <Loader
        route={{
          label: 'BusPlanReceptionMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/Convention/MgtOfContractSigning/BusPlanReceptionMgt/component/BusPlanReceptionMgtDetail')),
        }}
      />)
  },
  {
    path: '/Convention/MgtOfContractSigning/ElectronicAgtMgt/:id',
    label: '전자협약 상세',
    element: (
      <Loader
        route={{
          label: 'ElectronicAgtMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/component/ElectronicAgtMgtDetail')),
        }}
      />)
  },
  {
    path: '/Convention/ContractMgt/AgtChangeMgt/:id',
    label: '협약변경 상세',
    element: (
      <Loader
        route={{
          label: 'AgtChangeMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeMgtDetail')),
        }}
      />)
  },
  {
    path: '/Convention/ContractMgt/AgtChangeDetails/:id',
    label: '협약변경내역 상세',
    element: (
      <Loader
        route={{
          label: 'AgtChangeMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/Convention/ContractMgt/AgtChangeDetails/component/AgtChangeDetailsDetail')),
        }}
      />)
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];