export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  showSearch: boolean;
  showExport: boolean;
  showAddUser: boolean;
  showProceed: boolean;
  showAddProduct: boolean;
  showMainExport: boolean;
  showSortProduct: boolean;
  onSearchClick: () => void;
  onAddUserClick: () => void;
  onAddProductClick: () => void;
  period: string;
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
