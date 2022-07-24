import React from "react";

function GastosList(props) {
  return (
    <div>
      <ul id="todos" className="list-group ">
        {/* It was send a prop called "datos" that refers to expenses and it filters by day */}
        {props.datos
          .filter((dato) => dato.dia.toLowerCase() === props.dia)
          .map((gasto) => (
            <li
              key={gasto._id}
              className="list-group-item list-group-item-primary"
            >
              <span>{gasto.gasto}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default GastosList;
