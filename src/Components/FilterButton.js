const { faSquareFull } = require("@fortawesome/fontawesome-free-solid");

const FilterButton = (props) => {
  return (
    <div className="filterButton">
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
      />
      <label htmlFor={props.id}>
        {" "}
        {props.labelText} {props.labelNumberOfItems}
      </label>
    </div>
  );
}; 

export default FilterButton;