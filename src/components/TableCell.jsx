import { useDispatch, useSelector } from "react-redux";
import { actionPriceSlice } from "../redux/priceSlice";

const TableCell = ({ id }) => {
  const { data } = useSelector((state) => state.priceSlice);

  const dispatch = useDispatch();

  const newStoreId = data.reduce((acc, item) => {
    const result = item.months.reduce((subAcc, subItem) => {
      if (id === subItem.id) {
        const newSubValues = {
          ...subAcc,
          id: item.store.name,
          value: subItem.value,
        };
        return newSubValues;
      }
      return subAcc;
    }, {});
    return { ...acc, ...result };
  }, {});

  const handleChange = (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (newStoreId.id) {
        dispatch(
          actionPriceSlice.changeValue({
            id,
            storeId: newStoreId?.id,
            value: Number(e.target.value),
          })
        );
      }
    }
  };

  return (
    <div style={{ height: "20px" }}>
      <input
        type="number"
        value={newStoreId.value}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default TableCell;
