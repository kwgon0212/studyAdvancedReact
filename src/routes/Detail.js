import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let BtnColor = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

// let NewBtn = styled.button(BtnColor)`
//   border-radius : 5px;
// `;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);

  let { id } = useParams();
  let 찾은상품 = props.shoes.find((x) => {
    return x.id == id;
  });

  useEffect(() => {
    setTimeout(() => {
      // document.querySelector(".alert").style.display = "none";
      setAlert(false);
      console.log(1);
    }, 2000);
  }, [count]);

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <Box>
        <BtnColor bg="red">버튼</BtnColor>
        <BtnColor bg="blue">버튼</BtnColor>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (parseInt(id) + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p> */}
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
