import { React, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  UPDATE__DATA_SaleOrder,
  GET_DATA_BY_ID_SaleOrder,
} from "../../../Redux/actions/saleOrder";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
export const SaleOrderClone = (props) => {
  const data = useSelector((state) => state.Saleorder.Detail);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [Load, setLoad] = useState(false);

  const { edit, write } = useAccessibleRole("saleorders");

  useEffect(() => {
    dispatch(GET_DATA_BY_ID_SaleOrder(id));
    //   setLoad(true);
    // });
  }, []);
  const SignupSchema = Yup.object().shape({});
  const deleteItem = (index) => {
    const values = [...formik.values?.orderedItems];
    values.splice(index, 1);
    formik.setFieldValue("orderedItems", values);
  };
  const addItem = () => {
    const values = [...formik.values?.orderedItems];
    values.push({
      InventoryName: "",
      Quantity: "",
      ListPrice: "",
      Amount: "",
      Discount: "",
      Tax: "",
      Total: "",
    });
    formik.setFieldValue("orderedItems", values);
  };
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const values = [...formik.values?.orderedItems];
    values[index][name] = value;
    formik.setFieldValue("orderedItems", values);
  };

  const calculateSum = (index) => {
    const sum =
      formik.values.orderedItems[index].tax +
      formik.values?.orderedItems[index].amount -
      formik.values?.orderedItems[index].discount;
    formik.setFieldValue("orderedItems[${index}].total", sum); // Update field3 value
    return sum;
  };
  const calculateAutoTotal = (values) => {
    const { Amount, Discount, Tax } = values;
    const DiscountedAmount = Amount - Discount;
    const totalWithTax = DiscountedAmount + (DiscountedAmount * Tax) / 100;
    return totalWithTax.toFixed(2);
  };
  const calculateTotal = (values) => {
    const { orderedItems } = formik.values;
    let subTotal = 0;
    let discount = 0;
    let tax = 0;
    let grandTotal = 0;
    orderedItems.forEach((item) => {
      subTotal += Number(item.Amount);
      discount += Number(item.Discount);
      tax += Number(item.Tax);
      grandTotal += Number(item.Total);
    });
    formik.setFieldValue("SubTotal", subTotal.toFixed(2));
    formik.setFieldValue("Discount", discount.toFixed(2));
    formik.setFieldValue("Tax", tax.toFixed(2));
    formik.setFieldValue("GrandTotal", grandTotal.toFixed(2));
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Subject: data.Subject,
      CustomerNo: data.CustomerNo,
      QuoteName: data.QuoteName,
      Carrier: data.Carrier,
      SalesCommission: data.SalesCommission,
      AccountName: data.AccountName,
      DealName: data.DealName,
      PurchaseOrder: data.PurchaseOrder,
      DueDate: data.DueDate,

      ContactName: data.ContactName,
      ExciseDuty: data.ExciseDuty,
      Status: data.Status,
      BillingStreet: data.BillingStreet,
      BillingCity: data.BillingCity,
      BillingState: data.BillingState,
      BillingCode: data.BillingCode,
      BillingCountry: data.BillingCountry,
      ShippingStreet: data.ShippingStreet,
      ShippingCity: data.ShippingCity,
      ShippingState: data.ShippingState,
      ShippingCode: data.ShippingCode,
      ShippingCountry: data.ShippingCountry,
      orderedItems: data.orderedItems,
      SubTotal: data.SubTotal,
      Discount: data.Discount,
      Tax: data.Tax,
      Adjustment: data.Adjustment,
      GrandTotal: data.GrandTotal,
      TermsAndConditions: data.TermsAndConditions,
      Description: data.Description,
    },
  });

  return (
    <>
      {data?.Subject && (
        <Formik
          initialValues={{
            Subject: data.Subject,
            CustomerNo: data.CustomerNo,
            QuoteName: data.QuoteName,
            Carrier: data.Carrier,
            SalesCommission: data.SalesCommission,
            AccountName: data.AccountName,
            DealName: data.DealName,
            PurchaseOrder: data.PurchaseOrder,
            DueDate: data.DueDate,
            ContactName: data.ContactName,
            ExciseDuty: data.ExciseDuty,
            Status: data.Status,
            BillingStreet: data.BillingStreet,
            BillingCity: data.BillingCity,
            BillingState: data.BillingState,
            BillingCode: data.BillingCode,
            BillingCountry: data.BillingCountry,
            ShippingStreet: data.ShippingStreet,
            ShippingCity: data.ShippingCity,
            ShippingState: data.ShippingState,
            ShippingCode: data.ShippingCode,
            ShippingCountry: data.ShippingCountry,
            orderedItems: data.orderedItems,
            SubTotal: data.SubTotal,
            Discount: data.Discount,
            Tax: data.Tax,
            Adjustment: data.Adjustment,
            GrandTotal: data.GrandTotal,
            TermsAndConditions: data.TermsAndConditions,
            Description: data.Description,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            values._id = id;
            values.orderedItems = formik.values.orderedItems;
            dispatch(UPDATE__DATA_SaleOrder({ ...values })).then(() => {
              navigate("/crm/saleorder");
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex items-center  flex-col">
                <div className="container">
                  <div>
                    <p>Order Information</p>
                    <div className="bg-white rounded-md shadow p-3 my-2">
                      <div>
                        <div className="grid grid-cols-4 gap-3">
                          <div>
                            <label className="text-gray-600">Subject</label>
                            <div>
                              <Field
                                name="Subject"
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Subject"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Customer No</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Customer No"
                                name="CustomerNo"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Quote Name</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Quote Name"
                                name="QuoteName"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Carrier</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Carrier"
                                name="Carrier"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Sales Commission
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Sales Commission"
                                name="SalesCommission"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Account Name
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Account Name"
                                name="AccountName"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Deal Name</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Deal Name"
                                name="DealName"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Purchase Order
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Purchase Order"
                                name="PurchaseOrder"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Due Date</label>
                            <div>
                              <Field
                                type="date"
                                max={"3099-12-31"}
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Due Date"
                                name="DueDate"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Contact Name
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Contact Name"
                                name="ContactName"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Excise Duty</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Excise Duty"
                                name="ExciseDuty"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">Status</label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Status"
                                name="Status"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Billing Street
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Billing Street"
                                name="BillingStreet"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Billing City
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Billing City"
                                name="BillingCity"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Billing State
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Billing State"
                                name="BillingState"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Billing Code
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Billing Code"
                                name="BillingCode"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Billing Country
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Billing Country"
                                name="BillingCountry"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Shipping Street
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Shipping Street"
                                name="ShippingStreet"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Shipping City
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Shipping City"
                                name="ShippingCity"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Shipping State
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Shipping State"
                                name="ShippingState"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Shipping Code
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Shipping Code"
                                name="ShippingCode"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-600">
                              Shipping Country
                            </label>
                            <div>
                              <Field
                                type="text"
                                className="border rounded-md bg-white px-3 py-1.5 w-full"
                                placeholder="Enter Shipping Country"
                                name="ShippingCountry"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <p className="my-2">Items Details</p>
                  <div className="bg-white shadow rounded-md p-3">
                    <div className="media align-items-stretch  ht-100p">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" className="text-left pl-1">
                              Inventory Name
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Quantity
                            </th>
                            <th scope="col" className="text-left pl-1">
                              List Price
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Amount
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Discount
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Tax
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Total
                            </th>
                            <th scope="col" className="text-left pl-1">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formik.values?.orderedItems?.map((item, index) => (
                            <tr key={index}>
                              <td className="px-2">
                                <Field
                                  type="text"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Inventory Name"
                                  name={`orderedItems[${index}].inventoryName`}
                                  value={
                                    formik.values.orderedItems[index]
                                      .inventoryName
                                  }
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Quantity"
                                  name={`orderedItems[${index}].quantity`}
                                  value={
                                    formik.values.orderedItems[index].quantity
                                  }
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter List Price"
                                  name={`orderedItems[${index}].listPrice`}
                                  value={
                                    formik.values.orderedItems[index].listPrice
                                  }
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Amount"
                                  name={`orderedItems[${index}].amount`}
                                  value={
                                    formik.values.orderedItems[index].amount
                                  }
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Discount"
                                  name={`orderedItems[${index}].discount`}
                                  value={
                                    formik.values.orderedItems[index].discount
                                  }
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Tax"
                                  name={`orderedItems[${index}].tax`}
                                  value={formik.values.orderedItems[index].tax}
                                />
                              </td>
                              <td className="px-2">
                                <Field
                                  type="number"
                                  className="border rounded-md bg-white px-3 py-1.5 w-full"
                                  placeholder="Enter Total"
                                  name={`orderedItems[${index}].total`}
                                  disabled={editable}
                                  value={
                                    formik.values.orderedItems[index].amount -
                                    formik.values.orderedItems[index].discount +
                                    formik.values.orderedItems[index].tax
                                  }
                                />
                              </td>
                              <td>
                                {formik.values.orderedItems.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deleteItem(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addItem}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
                <div className="container">
                  <div>
                    <p className="my-2">Total</p>
                    <div className="bg-white shadow rounded-md p-3">
                      <div className="grid gap-3 grid-cols-4">
                        <div className="mt-2">
                          <label className="text-gray-600">Subtotal</label>
                          <div>
                            <Field
                              type="number"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Subtotal"
                              name="SubTotal"
                              disabled={editable}
                              value={formik?.values?.orderedItems?.reduce(
                                (acc, item) => acc + Number(item.amount),
                                0
                              )}
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">Discount</label>
                          <div>
                            <Field
                              type="number"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Discount"
                              name="Discount"
                              disabled={editable}
                              value={formik?.values?.orderedItems?.reduce(
                                (acc, item) => acc + Number(item.discount),
                                0
                              )}
                            />
                          </div>
                        </div>

                        <div className="mt-2">
                          <label className="text-gray-600">Adjustment</label>
                          <div>
                            <Field
                              type="number"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Adjustment"
                              name="Adjustment"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">
                            Terms and Conditions
                          </label>
                          <div>
                            <Field
                              type="text"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Terms and Conditions"
                              name="TermsAndConditions"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="mt-2">
                          <label className="text-gray-600">Grand Total</label>
                          <div>
                            <Field
                              type="number"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Grand Total"
                              name="GrandTotal"
                              disabled={editable}
                              value={formik?.values?.orderedItems?.reduce(
                                (acc, item) =>
                                  acc +
                                  Number(item.amount) -
                                  Number(item.discount) +
                                  Number(item.tax),
                                0
                              )}
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">Tax</label>
                          <div>
                            <Field
                              type="number"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Tax"
                              name="Tax"
                              disabled={editable}
                              value={formik?.values?.orderedItems?.reduce(
                                (acc, item) => acc + Number(item.tax),
                                0
                              )}
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">Description</label>
                          <div>
                            <Field
                              type="text"
                              className="border rounded-md bg-white px-3 py-1.5 w-full"
                              placeholder="Enter Description"
                              name="Description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-primary px-2 py-1 w-[100px] rounded-md mt-2 text-white"
                      type="submit"
                      disabled={isSubmitting || !write || !edit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SaleOrderClone;
