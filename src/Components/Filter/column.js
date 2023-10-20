import React from "react";

const Column = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span>
      Search:{" "}
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder={`Filter ${column.Header}...`}
      />
    </span>
  );
};

export default Column;
