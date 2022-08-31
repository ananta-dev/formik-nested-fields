import React from "react";
import ReactDOM from "react-dom";

import { Formik, Field, connect, getIn } from "formik";
import * as yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const phoneRegex = /^[0-9]{8}$/;

const addressSchema = yup.object().shape({
  firstname: yup.string().required().max(35),
  lastname: yup.string().required().max(35),
  company: yup.string().max(35),
  address1: yup.string().required().max(35),
  address2: yup.string().max(35),
  city: yup.string().required(),
  stateId: yup.string().required(),
  zipcode: yup.string().required().length(5),
  phone: yup
    .string()
    .required()
    .matches(phoneRegex, "Phone number is not valid")
});

const checkoutFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  billAddressAttributes: addressSchema,
  shipAddressAttributes: addressSchema
});

const getFieldRenderer = ({ label }) => ({ field, form }) => {
  const error = getIn(form.errors, field.name);
  return (
    <div className="form-group">
      <label style={{ marginRight: 10 }}>{label}</label>
      <input className="form-control" {...field} />

      {error ? <small className="form-text text-danger">{error}</small> : null}
    </div>
  );
};

const AddressFormFields = ({ prefix, title }) => (
  <div>
    <h4 className="text-center">{title}</h4>
    <Field
      name={`${prefix}.firstname`}
      render={getFieldRenderer({ label: "First Name " })}
    />

    <Field
      name={`${prefix}.lastname`}
      render={getFieldRenderer({ label: "Last Name " })}
    />

    <Field
      name={`${prefix}.phone`}
      render={getFieldRenderer({ label: "Phone " })}
    />
  </div>
);

const App = () => (
  <div className="container">
    <Formik onSubmit={console.log} validationSchema={checkoutFormSchema}>
      {(formikProps) => (
        <>
          <Field name="email" render={getFieldRenderer({ label: "Email" })} />

          <AddressFormFields
            prefix="billAddressAttributes"
            title="Billing information"
          />
          <AddressFormFields
            prefix="shipAddressAttributes"
            title="Shipping information"
          />

          <button className="btn btn-primary" type="submit">
            Submit
          </button>

          <pre
            style={{
              width: 500,
              background: "lightgray",
              border: "1px solid black",
              padding: 10,
              margin: "30px auto 0 auto"
            }}
          >
            {JSON.stringify(formikProps, null, 2)}
          </pre>
        </>
      )}
    </Formik>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
