import React from "react";
import { useSelector } from "react-redux";

const FooterPrice = ({ header, keys, index }) => {
  const { data } = useSelector((state) => state.priceSlice);

  const choosedKey = keys.map((item) => item[index]);

  const footerPrice = data.map((item) =>
    item.months.find((item) => choosedKey.includes(item.id))
  );
  const totalFooterPrice = footerPrice.reduce((acc, item) => {
    if (item?.value) {
      return acc + item?.value;
    }
    return acc;
  }, 0);

  return <div>$ {totalFooterPrice}</div>;
};

export default FooterPrice;
