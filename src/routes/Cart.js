import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { increaseAge, changeName } from "./../store/userSlice";
import { decreaseQuantity, increaseQuantity, rmItem } from "../store";
import { memo, useMemo, useState } from "react";

// let Child = memo(() => {
//   console.log("rendering");
//   return <div>자식임</div>;
// });

function 함수() {
  return;
}

function Cart() {
  //   let [count, setCount] = useState(0);
  let cart = useSelector((state) => state.cart);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let result = useMemo(() => 함수(), []);

  return (
    <>
      <div>
        {/* <Child></Child>
        <button onClick={() => setCount(count++)}>+</button> */}
        {user.age}살인 {user.name}의 장바구니
      </div>
      {/* <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        버튼
      </button> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>상품의 id</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() => {
                      dispatch(increaseQuantity(cart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() => {
                      dispatch(decreaseQuantity(cart[i].id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(rmItem(cart[i].id));
                    }}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Cart;
