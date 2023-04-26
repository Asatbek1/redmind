import { useSelector } from "react-redux";

  const Total = ({ original }) => {
    const { data } = useSelector((state) => state.priceSlice);
  
    const totalPrice = data.reduce((acc, item) => {
      if (item.store.id === original.store.id) {
        return (
          acc +
          item.months.reduce((subAcc, subItem) => {
            return subAcc + subItem.value;
          }, 0)
        );
      }
      return acc;
    }, 0);
  
    return <div>Total: $ {totalPrice}</div>;
  };
  
  export default Total;
