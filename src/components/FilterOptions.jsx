/* eslint-disable react/prop-types */
import CheckBoxInput from "./CheckBoxInput";

function FilterOptions({ title, type, actionType }) {
  return (
    <div className="flex flex-col justify-between gap-3">
      <legend className="font-bold">{title}</legend>
      <div className="flex flex-wrap justify-between flex-row">
        {type.map((diet, index) => {
          return <CheckBoxInput option={diet} type={actionType} key={index} />;
        })}
      </div>
    </div>
  );
}

export default FilterOptions;
