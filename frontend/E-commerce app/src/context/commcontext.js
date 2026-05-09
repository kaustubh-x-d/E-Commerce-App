import React from "react";

const CommContext = React.createContext({
  prodlist: [],
  changeList: () => {},
  cartList:[],
  changeCart:()=>{}
});

export default CommContext;