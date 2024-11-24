export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  showSearch: boolean;
  showExport?: boolean;
  showAddUser?: boolean;
  showProceed?: boolean;
  showAddProduct?: boolean;
  showMainExport?: boolean;
  showSortProduct?: boolean;
  showApproveAll?: boolean;
  onSearchClick?: () => void;
  onAddUserClick?: () => void;
  onAddProductClick?: () => void;
  onApproveAllClick?: () => void;
  period?: string;
}

export interface Product {
  productID: bigint;
  productName: string;
  productPrice: bigint;
  quantity: bigint;
  uploader: string;
  dateAdded: bigint;
  barcode: string;
}

export interface Sale {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  rep: {
    name: string;
    avatar: string;
  };
  paymentMode: string;
  time: string;
  date: string;
}

export interface Inventory {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  rep: {
    name: string;
    avatar: string;
  };
  date: string;
  barcode: string;
}

export interface PaymentItem {
  name: string;
  quantity: number;
  amount: number;
}

export interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaymentItem[];
}

export interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type DataPoint = {
  date: Date;
  value: number;
  highlight?: boolean;
};



export interface User {

  staffID: bigint;

  name: string;

  email: string;

  phoneNumber: bigint;

  status: number;

  dateJoined: bigint;

  role: number;

}
