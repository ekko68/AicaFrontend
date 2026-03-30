import create from "zustand";
import {EquipmentClassifyData, EquipmentClassifyRowData} from "~/service/Model";

interface State {
  category?: EquipmentClassifyData,
  tableRows: EquipmentClassifyRowData[],
  setCategory: (date: EquipmentClassifyData) => void
  setRow: (rows: EquipmentClassifyRowData[]) => void
}

export const useEquipmentClassifyStore = create<State>(set => ({
  tableRows: [],
  setCategory: (data: EquipmentClassifyData) => {
    set((state) => ({
      category: data,
      tableRows: data.child.map((m, i) => {
        return {
          id: m.eqpmnClfcId,
          order: m.sortOrder,
          title: m.eqpmnClfcNm,
          enable: m.enabled? "사용" : "미사용",
        }
      }).sort((a,b) => a.order - b.order),
    }))
  },
  setRow: (rows: EquipmentClassifyRowData[]) => {
    set((state) => ({
      tableRows: rows
    }))
  },
}))