import React from "react";
import AddtoCartButton from "../menu/AddToCartButton";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { description, name, basePrice, sizes, extraIngredientPrices, image } =
    item;
  const hasSizesOrExtras = sizes.length > 0 || extraIngredientPrices.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        {" "}
        <img src="/pizza.png" alt="Pixxa" className="max-h-24 block mx-auto" />
      </div>

      <h4 className="font-semibold  text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddtoCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        pressing={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
};

export default MenuItemTile;
