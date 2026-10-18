export enum Operator {
  AND = 'AND',
  OR = 'OR',
}

export interface BuildSearchParams<T> {
  search: Partial<Record<keyof T, any>>;
  operator?: Operator;
}
// Partial: có thể sử dụng để thêm dấu ? phía trước
// có nghĩa là có cũng được
