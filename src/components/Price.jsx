import React from "react";
import { useSelector } from "react-redux";

const Price = () => {
  const { data } = useSelector((state) => state.priceSlice);

  const totalOfTotalMonths = data.map((item) =>
    item.months.map((el) => el.value).reduce((acc, value) => acc + value, 0)
  );

  const totalOfTotalPrice = totalOfTotalMonths.reduce(
    (acc, item) => acc + item,
    0
  );

  return <div>$ {totalOfTotalPrice}</div>;
};

export default Price;
