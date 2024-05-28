import React from "react";
import { useState } from "react";
import Plus from "../../components/icons/Plus";
import Trash from "../../components/icons/Trash";
import ChevronDown from "../../components/icons/ChevronDown";
import ChevronUp from "../../components/icons/ChevronUp";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
  const [open, setOpen] = useState(false);
  const addSize = () => {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  };

  const editSize = (ev, index, prop) => {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeSize = (indextoremove) => {
    setProps((prev) => prev.filter((v, index) => index !== indextoremove));
  };
  return (
    <div className="bg-gray-200 p-2 mb-2 rounded-md">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="inline-flex p-1 border-0 justify-start"
      >
        {open && <ChevronUp />}
        {!open && <ChevronDown />}

        <span>{name}</span>
        <span>({props?.length})</span>
      </button>

      <div className={open ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editSize(ev, index, "name")}
                ></input>
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editSize(ev, index, "price")}
                ></input>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white mb-2 px-2"
                  onClick={() => removeSize(index)}
                >
                  {" "}
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={() => addSize()}
          className="bg-white items-center"
        >
          <Plus className="w-2 h-5" />
          <span> {addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
