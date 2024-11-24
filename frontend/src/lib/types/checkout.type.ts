export type TCheckout = {
  checkoutID: number;
  quantity: number;
  total: number;
  paymentMode: string;
  date: Date;
  status: string;
  products: [];
};
