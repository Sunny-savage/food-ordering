import React from "react";

const AddToCartButton = ({ hasSizesOrExtras, pressing, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <button
        type="button"
        onClick={pressing}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2"
      >
        <span>Add to cart&nbsp;${basePrice}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={pressing}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
