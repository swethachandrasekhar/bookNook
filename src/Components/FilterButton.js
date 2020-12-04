//Filter / input button functional component

const FilterButton = ({
  type,
  id,
  name,
  value,
  labelText,
  labelNumberOfItems,
}) => {
  return (
    <div className="filterButton">
      <input type={type} id={id} name={name} value={value} />
      <label htmlFor={id}>
        {" "}
        {labelText}{" "}
        <span className="itemsCount">
          {labelNumberOfItems === "" ? null : `(${labelNumberOfItems})`}{" "}
        </span>
      </label>
    </div>
  );
};

export default FilterButton;
