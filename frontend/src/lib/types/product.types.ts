export interface IProductParams {
  text?: string;
  page?: number;
  perPage?: number;
  status?: string;
}
export interface IProductStore {
  isOpen: boolean;
  setIsOpen: (business: boolean) => void;
  params: IProductParams;
  setParams: (params: IProductParams) => void;
}
