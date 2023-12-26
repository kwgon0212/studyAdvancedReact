import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { increaseAge, changeName } from "./../store/userSlice";

function Cart() {
  let cart = useSelector((state) => state.cart);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <>
      <div>
        {user.age}살인 {user.name}의 장바구니
      </div>
      <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        버튼
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>상품의 id</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
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
                    onClick={() => {
                      dispatch(changeName());
                    }}
                  >
                    +
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
