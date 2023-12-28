import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";

import { Context1 } from "./../App";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

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
  let { 재고, shoes } = useContext(Context1);

  let [count, setCount] = useState(0);
  let [alerts, setAlert] = useState(true);
  let [num, setNum] = useState("");
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");

  let { id } = useParams();
  let 찾은상품 = props.shoes.find((x) => {
    return x.id == id;
  });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("watched"));
    data.push(찾은상품.id);
    data = new Set(data);
    data = Array.from(data);
    localStorage.setItem("watched", JSON.stringify(data));
  }, []);

  let dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      // document.querySelector(".alert").style.display = "none";
      setAlert(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      alert("숫자를 입력해주세요");
      document.querySelector(".num").value = "";
    }
  }, [num]);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade2("content-end");
    }, 500);
    return () => {
      clearTimeout(a);
      setFade2("");
    };
  }, []);

  return (
    <div className={`container content-start ${fade2}`}>
      {alerts == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {/* {count} */}
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <Box>
        <BtnColor bg="red">버튼</BtnColor>
        <BtnColor bg="blue">버튼</BtnColor>
      </Box> */}
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
          <input
            className="num"
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({ id: 찾은상품.id, name: 찾은상품.title, count: 1 })
              );
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            상세내용
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            리뷰
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            Q&A
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div>
  );
}

function TabContent({ tab }) {
  // if (tab == 0) {
  //   return <div>상세내용~~</div>;
  // } else if (tab == 1) {
  //   return <div>Review</div>;
  // } else if (tab == 2) {
  //   return <div>QnA 입니다</div>;
  // }
  let [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("content-end");
    }, 500);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"content-start " + fade}>
      {[<div>상세내용~~</div>, <div>Review</div>, <div>QnA 입니다</div>][tab]}
    </div>
  );
}

export default Detail;
