import React from "react";

const ItemDetails = data => {
  const item = data.pageContext;

  return (
    <>
      <h1>{item.name}</h1>
      {item.bonus}
    </>
  );
};

export default ItemDetails;
