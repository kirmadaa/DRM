import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, FieldForm, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { CREATE__DATA_SaleOrder } from "../../../Redux/actions/purchaseOrder";
import { TRACK_TOUCH } from "../../../Redux/actions/comman";
import { Plus } from "react-feather";
import { DeleteIcon } from "../../../assets/svgIcons";
import useAccessibleRole from "../../../hooks/useAccessibleRole";
import { useEffect } from "react";
import { GET_USER_PROFILE } from "../../../Redux/actions/user";

export const CreatepurchaseOrder = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const parentModule = queryParams.get("parentModule");
  const [editable, setEditable] = useState(true);
  const location = useLocation();
  const { edit, write } = useAccessibleRole("purchaseorders");

  const getConnectionId = location?.search
    ?.split("?connectionId=")[1]
    ?.split("?prePathname=");
  const detailPageIs = location?.search?.split("&detailPageIs=");
  const SignupSchema = Yup.object().shape({
    Subject: Yup.string().required("Subject is Required"),
  });
  const formik = useFormik({
    initialValues: {
      Subject: "",
      PurchaseOrdersOwnerId: "",
      CustomerNo: "",
      QuoteName: "",
      Carrier: "",
      SalesCommission: "",
      AccountName: "",
      DealName: "",
      PurchaseOrder: "",
      DueDate: "",
      ContactName: "",
      ExciseDuty: "",
      Status: "",
      BillingStreet: "",
      BillingCity: "",
      BillingState: "",
      BillingCode: "",
      BillingCountry: "",
      ShippingStreet: "",
      ShippingCity: "",
      ShippingState: "",
      ShippingCode: "",
      ShippingCountry: "",
      orderedItems: [
        {
          inventoryName: "",
          quantity: "",
          listPrice: "",
          amount: "",
          discount: "",
          tax: "",
          total: "",
        },
      ],
      SubTotal: 0,
      Discount: 0,
      Tax: 0,
      Adjustment: 0,
      GrandTotal: 0,
      TermsAndConditions: "",
      Description: "",
    },
  });

  const deleteItem = (index) => {
    const values = [...formik.values?.orderedItems];
    values.splice(index, 1);
    formik.setFieldValue("orderedItems", values);
  };
  const addItem = () => {
    const values = [...formik.values?.orderedItems];
    values.push({
      inventoryName: "",
      quantity: "",
      listPrice: "",
      amount: "",
      discount: "",
      tax: "",
      total: "",
    });
    formik.setFieldValue("orderedItems", values);
  };
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const values = [...formik.values.orderedItems];
    values[index][name] = value;
    formik.setFieldValue("orderedItems", values);
  };
  const calculateAutoTotal = (values) => {
    const { amount, discount, tax } = values;
    const discountedAmount = amount - discount;
    const totalWithTax = discountedAmount + (discountedAmount * tax) / 100;
    return totalWithTax.toFixed(2);
  };
  // total calculation for each item on change of amount, discount , tax grand total
  const calculateTotal = (values) => {
    const { orderedItems } = formik.values;
    let subTotal = 0;
    let discount = 0;
    let tax = 0;
    let grandTotal = 0;
    orderedItems.forEach((item) => {
      subTotal += Number(item.amount);
      discount += Number(item.discount);
      tax += Number(item.tax);
      grandTotal += Number(item.total);
    });
    formik.setFieldValue("SubTotal", subTotal.toFixed(2));
    formik.setFieldValue("Discount", discount.toFixed(2));
    formik.setFieldValue("Tax", tax.toFixed(2));
    formik.setFieldValue("GrandTotal", grandTotal.toFixed(2));
  };

  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      if (res?.success) {
        formik.setFieldValue(
          "PurchaseOrdersOwnerId",
          res?.data?.data[0]?.userId
        );
      }
    });
  }, []);

  const onSubmit = async (values) => {
    if (location && location?.state) {
      const { getConnectionId, moduleName, prePathname } = location && location?.state

      let payload = {
        ...values,
        ModuleTitle: "purchaseOrders",
        ...(parentModule ? { parentModule: parentModule } : {}),
      };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId;
      }
      await dispatch(CREATE__DATA_SaleOrder(payload));

      if (getConnectionId?.length > 1) {
        await dispatch(
          TRACK_TOUCH({ id: getConnectionId, module: detailPageIs })
        );
      }
      setTimeout(() => {
        navigate("/crm/purchaseorder");
      }, 3000);
    } else {
      let payload = {
        ...values,
        ModuleTitle: "purchaseOrders",
        ...(parentModule ? { parentModule: parentModule } : {}),
      };
      if (getConnectionId?.length > 1) {
        payload["connectionId"] = getConnectionId[0];
      }

      dispatch(CREATE__DATA_SaleOrder(payload)).then(async () => {
        if (getConnectionId?.length > 1) {
          await dispatch(
            TRACK_TOUCH({
              id: getConnectionId[0],
              module: detailPageIs[1],
            })
          );
          navigate(getConnectionId[1]);
        } else {
          navigate("/crm/purchaseorder");
        }
      });

    }
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={formik.values}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center  flex-col">
              <div className="container">
                <div className="flex gap-3 justify-end mt-5">
                  <Link
                    className="bg-white rounded-2xl text-primary py-2 px-10 border border-primary"
                    to="/crm/purchaseorder"
                  >
                    Back
                  </Link>
                  {write && (
                    <button
                      className="  bg-primary rounded-2xl text-white py-2 px-10 text-align center"
                      type="submit"
                      disabled={isSubmitting || !edit || !write}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
              <div className="container">
                <div>
                  <div className="bg-white rounded-md shadow p-4 my-2">
                    <p className="text-[#191242] font-semibold ">
                      Order Information
                    </p>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-gray-600">Subject</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              name="Subject"
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Subject"
                            />
                            <ErrorMessage name="Subject">
                              {(msg) => (
                                <div className="text-red-500">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600 ">Customer No</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Customer No"
                              name="CustomerNo"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Quote Name</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Quote Name"
                              name="QuoteName"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Carrier</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Carrier"
                              name="Carrier"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Sales Commission
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:bg-[#ffffff] focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Sales Commission"
                              name="SalesCommission"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Account Name</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Account Name"
                              name="AccountName"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Deal Name</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Deal Name"
                              name="DealName"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Purchase Order
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Purchase Order"
                              name="PurchaseOrder"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Due Date</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="date"
                              max={"3099-12-31"}
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Due Date"
                              name="DueDate"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Contact Name</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Contact Name"
                              name="ContactName"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Excise Duty</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Excise Duty"
                              name="ExciseDuty"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Status</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Status"
                              name="Status"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Billing Street
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Billing Street"
                              name="BillingStreet"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Billing City</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Billing City"
                              name="BillingCity"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Billing State</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Billing State"
                              name="BillingState"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Billing Code</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Billing Code"
                              name="BillingCode"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Billing Country
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Billing Country"
                              name="BillingCountry"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Shipping Street
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Shipping Street"
                              name="ShippingStreet"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Shipping City</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Shipping City"
                              name="ShippingCity"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Shipping State
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Shipping State"
                              name="ShippingState"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">Shipping Code</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Shipping Code"
                              name="ShippingCode"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-600">
                            Shipping Country
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:bg-[#ffffff] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
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
              <div className="container ">
                <div className="bg-white rounded-md shadow p-4 my-2">
                  <div className="flex justify-between ">
                    <p className="text-[#191242] font-semibold ">
                      Items Details
                    </p>
                    <button
                      type="button"
                      className="btn adduser hover:bg-[#191242] focus:shadow-none font-medium gap-3 bg-[#191242] flex items-center text-white py-[14px] px-4 rounded-2xl btn-primary"
                      onClick={addItem}
                    >
                      <Plus />
                      Add Item
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="border-[1.5px] border-[#E6E6EB] rounded-2xl">
                      <table className="table table-dashboard mg-b-0 w-full rounded-2xl overflow-hidden">
                        <thead className="text-sm text-gray-900 font-medium bg-gray-200">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Inventory Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              List Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Discount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Tax
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Total
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-left font-medium"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formik.values?.orderedItems.map((item, index) => (
                            <tr key={index} className="bg-white cursor-pointer">
                              <td className="px-5 py-4">
                                <Field
                                  type="text"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Inventory Name"
                                  name={`orderedItems[${index}].inventoryName`}
                                  value={
                                    formik.values.orderedItems[index]
                                      .inventoryName
                                  }
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  type="number"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Quantity"
                                  name={`orderedItems[${index}].quantity`}
                                  value={
                                    formik.values.orderedItems[index].quantity
                                  }
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  type="number"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter List Price"
                                  name={`orderedItems[${index}].listPrice`}
                                  value={
                                    formik.values.orderedItems[index].listPrice
                                  }
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  type="number"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Amount"
                                  name={`orderedItems[${index}].amount`}
                                  value={
                                    formik.values.orderedItems[index].amount
                                  }
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  type="number"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Discount"
                                  name={`orderedItems[${index}].discount`}
                                  value={
                                    formik.values.orderedItems[index].discount
                                  }
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  type="number"
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  placeholder="Enter Tax"
                                  name={`orderedItems[${index}].tax`}
                                  value={formik.values.orderedItems[index].tax}
                                  onChange={formik.handleChange}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <Field
                                  className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                                  type="number"
                                  placeholder="Enter Total"
                                  name={`orderedItems[${index}].total`}
                                  onChange={formik.handleChange}
                                  disabled={editable}
                                  value={
                                    formik.values.orderedItems[index].amount -
                                    formik.values.orderedItems[index].discount +
                                    formik.values.orderedItems[index].tax
                                  }
                                />
                              </td>
                              <td className="px-5 py-4 text-center">
                                {formik.values.orderedItems.length > 1 && (
                                  <span
                                    className="p-2 ml-2 inline-block rounded bg-[#FFEAEF]"
                                    onClick={() => deleteItem(index)}
                                  >
                                    <DeleteIcon />
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div>
                  <div className="bg-white rounded-md shadow p-4 my-2">
                    <p className="text-[#191242] font-semibold ">Total</p>
                    <div className="p-4">
                      <div className="grid gap-3 grid-cols-4">
                        <div className="mt-2">
                          <label className="text-gray-600">Subtotal</label>
                          <div className="mt-2">
                            <Field
                              type="number"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Subtotal"
                              name="SubTotal"
                              disabled={editable}
                              value={formik.values.orderedItems.reduce(
                                (acc, item) => acc + Number(item.amount),
                                0
                              )}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">Discount</label>
                          <div className="mt-2">
                            <Field
                              type="number"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Discount"
                              name="Discount"
                              disabled={editable}
                              onChange={formik.handleChange}
                              value={formik.values.orderedItems.reduce(
                                (acc, item) => acc + Number(item.discount),
                                0
                              )}
                            />
                          </div>
                        </div>

                        <div className="mt-2">
                          <label className="text-gray-600">Adjustment</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="number"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Adjustment"
                              name="Adjustment"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">
                            Terms and Conditions
                          </label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Terms and Conditions"
                              name="TermsAndConditions"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="mt-2">
                          <label className="text-gray-600">Grand Total</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="number"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Grand Total"
                              name="GrandTotal"
                              disabled={editable}
                              value={formik.values.orderedItems.reduce(
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
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="number"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Tax"
                              name="Tax"
                              disabled={editable}
                              value={formik.values.orderedItems.reduce(
                                (acc, item) => acc + Number(item.tax),
                                0
                              )}
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="text-gray-600">Description</label>
                          <div className="mt-2">
                            <Field
                              onChange={formik.handleChange}
                              type="text"
                              className="form-control rounded-[10px] w-full  border-[1.5px] bg-[#F8F8FC] focus:outline-0 focus:border-primary py-[10px] px-4  border-[#dce2eb]   p-2 text-base"
                              placeholder="Enter Description"
                              name="Description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreatepurchaseOrder;
