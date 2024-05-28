import React from "react";

const AddressInputs = ({ addressProps, setAddressProps, disabled = false }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Contact</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ""}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        placeholder="Phone number"
      ></input>
      <label>Street Address</label>
      <input
        disabled={disabled}
        type="text"
        value={streetAddress || ""}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        placeholder="Street address"
      ></input>
      <div className="gird grid-cols-2 gap-2">
        {" "}
        <div>
          {" "}
          <label>City</label>
          <input
            disabled={disabled}
            style={{ margin: "0" }}
            type="text"
            value={city || ""}
            onChange={(e) => setAddressProps("city", e.target.value)}
            placeholder="City"
          ></input>
        </div>
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            style={{ margin: "0" }}
            value={postalCode || ""}
            onChange={(e) => setAddressProps("postalcode", e.target.value)}
            placeholder="Postal code"
          ></input>
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        value={country || ""}
        onChange={(e) => setAddressProps("country", e.target.value)}
        placeholder="Country"
      ></input>
    </>
  );
};

export default AddressInputs;
