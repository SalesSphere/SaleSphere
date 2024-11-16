"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import { sales } from "@/lib/data";
import { navigation } from "@/lib/data";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CheckoutScreen = () => {

  const [filteredProducts, setFilteredProducts] = useState(sales);  
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  type Product = {
    name: string;
    price: string;
    quantity: string;
  };

  const totalSum = products.reduce(
    (sum, product) => sum + Number(product.quantity) * Number(product.price),
    0
  );
  const vat = totalSum * 0.020;
  const total = totalSum + vat;

  const handleSearch = (query: string) => {

    const filtered = sales.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
    setNewProduct((prev) => ({ ...prev, name: query }));
  };

  const handleSelectProduct = (product: { productName: string; price: number }) => {
    setNewProduct({
      ...newProduct,
      name: product.productName,
      price: product.price.toString(),
    });
    setFilteredProducts([]); // Clear the dropdown
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleAddProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
      },
    ]); 

    setNewProduct({
      name: "",
      price: "",
      quantity: "",
    });
  }
  

  const input = "h-14 w-full px-4 py-3 border border-[#292D321A] rounded-lg focus:outline-none focus:border-none"; 
  const label = "flex flex-col gap-y-2";

  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Checkout page"
          subtitle="View and edit all product info present in your store"
          showSearch={false}
          showExport={false}
          showAddUser={false}
          showAddProduct={false}
          showMainExport={false}
          showProceed={false}
          showSortProduct={false}
          showApproveAll={false}
          onApproveAllClick={() => {}}
          period="Last 360 days"
          onSearchClick={() => {}}
          onAddUserClick={() => {}}
          onAddProductClick={() => {}}
        />
        {/* <ProductOrderTable /> */}

        <main className="flex lg:justify-between justify-center items-center lg:items-start flex-col-reverse lg:flex-row w-full lg:gap-x-8">
          <section className="hidden lg:flex flex-col p-[40px] lg:w-1/2 rounded-lg bg-[#292D320D]">
            <div className="pb-4">
              <h3 className="text-xl font-semibold">Add new Product</h3>
              <p className="text-[#292D32B2]">Fill in the form below to input the product information</p>
            </div>
            <form onSubmit={handleAddProducts} className="flex flex-col gap-y-4">
              <div className={`${label} relative`}>
                <label htmlFor="productName">Product Name</label>
                <input className={input} 
                id="productName" 
                type="text" 
                required 
                placeholder="Enter product name"
                // onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                onChange={(e) => handleSearch(e.target.value)}
                value={newProduct.name} />

                {filteredProducts.length > 0 && (
                  <ul className="bg-white border rounded-lg mt-2 max-h-40 overflow-auto absolute w-full z-10 top-[100%]">
                    {filteredProducts.map((product, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectProduct(product)}
                      >
                        {product.productName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={label}>
                <label htmlFor="productPrice">Product Price</label>
                <input className={`${input} cursor-not-allowed bg-[#292D3226]`} 
                id="productPrice" 
                type="text" 
                required 
                readOnly
                value={newProduct.price} />
              </div>

              <div className={label}>
                <label htmlFor="productQuantity">Product Quantity</label>
                <input className={input} 
                id="productQuantity" 
                type="number" 
                required 
                placeholder="Enter product quantity"
                onChange={(e) => setNewProduct  ({...newProduct, quantity: e.target.value})}
                value={newProduct.quantity} />
              </div>

              <button type="submit" className="h-14 w-full bg-[#292D32] text-white rounded-lg mt-4">Add Product</button>
            </form>
          </section>

          <button type="submit" className="h-14 w-full bg-[#292D32] lg:hidden text-white rounded-lg">Add Product</button>


          <section className="p-[40px] w-1/2 flex flex-col items-end rounded-2xl border space-y-10">
            <header className="w-full flex justify-end text-right space-y-4">
              <main className="w-[56%] flex flex-col gap-y-4">
                <h1 className="text-3xl font-semibold">Receipt</h1>
                <div>
                  <p>SaleSphere</p>
                  <p>REG: 00000000000</p>
                  <p>sale@salesphere.com | +64 123 1234 123</p>
                </div>
                <div className="w-full">
                  <p className="flex justify-between">
                    <span>Date:</span> <span>{new Date().toDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Time:</span> <span>{new Date().toDateString()}</span>
                  </p>
                </div>
              </main>
            </header>

            <Table>
              <TableHeader>
                <TableRow className="!bg-[#292D321A] rounded-md">
                  <TableHead className="text-left">Product</TableHead>
                  <TableHead className="text-left">Qty</TableHead>
                  <TableHead className="text-left">Unit price</TableHead>
                  <TableHead className="text-left">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>#{product.price}</TableCell>
                    <TableCell className="flex items-center justify-between">
                      <span>#{Number(product.quantity) * Number(product.price)}</span>
                      <button onClick={() => handleRemoveProduct(index)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.60016 11.3334L8.00016 8.93337L10.4002 11.3334L11.3335 10.4L8.9335 8.00004L11.3335 5.60004L10.4002 4.66671L8.00016 7.06671L5.60016 4.66671L4.66683 5.60004L7.06683 8.00004L4.66683 10.4L5.60016 11.3334ZM8.00016 14.6667C7.07794 14.6667 6.21127 14.4917 5.40016 14.1417C4.58905 13.7917 3.8835 13.3167 3.2835 12.7167C2.6835 12.1167 2.2085 11.4112 1.8585 10.6C1.5085 9.78893 1.3335 8.92226 1.3335 8.00004C1.3335 7.07782 1.5085 6.21115 1.8585 5.40004C2.2085 4.58893 2.6835 3.88337 3.2835 3.28337C3.8835 2.68337 4.58905 2.20837 5.40016 1.85837C6.21127 1.50837 7.07794 1.33337 8.00016 1.33337C8.92239 1.33337 9.78905 1.50837 10.6002 1.85837C11.4113 2.20837 12.1168 2.68337 12.7168 3.28337C13.3168 3.88337 13.7918 4.58893 14.1418 5.40004C14.4918 6.21115 14.6668 7.07782 14.6668 8.00004C14.6668 8.92226 14.4918 9.78893 14.1418 10.6C13.7918 11.4112 13.3168 12.1167 12.7168 12.7167C12.1168 13.3167 11.4113 13.7917 10.6002 14.1417C9.78905 14.4917 8.92239 14.6667 8.00016 14.6667ZM8.00016 13.3334C9.48905 13.3334 10.7502 12.8167 11.7835 11.7834C12.8168 10.75 13.3335 9.48893 13.3335 8.00004C13.3335 6.51115 12.8168 5.25004 11.7835 4.21671C10.7502 3.18337 9.48905 2.66671 8.00016 2.66671C6.51127 2.66671 5.25016 3.18337 4.21683 4.21671C3.1835 5.25004 2.66683 6.51115 2.66683 8.00004C2.66683 9.48893 3.1835 10.75 4.21683 11.7834C5.25016 12.8167 6.51127 13.3334 8.00016 13.3334Z" fill="#FF1900"/>
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}


                {products.length > 0 && 
                  <>
                  <TableRow className="w-fullflex justify-between border-none">
                    <TableCell>Subtotal</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right pr-4">{totalSum}</TableCell>
                  </TableRow>
                  <TableRow className="w-fullflex justify-between">
                    <TableCell>VAT</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right pr-4">{vat}</TableCell>
                  </TableRow>
                  <TableRow className="w-fullflex justify-between">
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="font-semibold text-right pr-4">{total}</TableCell>
                  </TableRow>
                  </>
                }
              </TableBody>
            </Table>
            
            {products.length > 0 && <button className="h-12 w-2/6 border border-[#292D32] text-[#292D32] hover:bg-[#292D32] hover:text-white rounded-lg">Checkout</button> }
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default CheckoutScreen
