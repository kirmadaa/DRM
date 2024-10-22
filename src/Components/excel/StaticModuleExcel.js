import React from "react";
import { useLocation } from "react-router-dom";
import SaleOrderExcel from "../../View/App/sale-order/saleOrderExcel";
import PurchaseOrderExcel from "../../View/App/purches/purchaseOrderExcel";
import InvoiceExcel from "../../View/App/invoice/invoiceExcel";
import QuotesExcel from "../../View/App/quotes/quotesExcel";

const StaticModuleExcel = () => {
  const location = useLocation();
  const importPageIs = location?.search?.split("?module=");

  return (
    <>
      {importPageIs[1] === "saleOrders" ? (
        <SaleOrderExcel />
      ) : importPageIs[1] === "purchaseOrders" ? (
        <PurchaseOrderExcel />
      ) : importPageIs[1] === "Invoice" ? (
        <InvoiceExcel />
      ) : importPageIs[1] === "Quotes" ? (
        <QuotesExcel />
      ) : (
        ""
      )}
    </>
  );
};

export default StaticModuleExcel;
