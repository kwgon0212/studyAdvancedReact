import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import mainImg from "./img/bg.png";
import { useState } from "react";
import shoesData from "./data";
import Detail from "./routes/Detail";

import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  let [shoes, setShoes] = useState(shoesData);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">신발#</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + mainImg + ")" }}
              ></div>

              <button
                onClick={() => {
                  let copy = [...shoes];
                  copy.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                  });
                  setShoes(copy);
                }}
              >
                가나다순 정렬
              </button>

              <Container>
                <Row>
                  {shoes.map((a, i) => {
                    // 내가 한 방식
                    return <Shoes index={i} shoes={shoes}></Shoes>;

                    // // 다른 방식
                    // return <Shoes i={i} shoes={shoes[i]}></Shoes>;
                  })}
                </Row>
              </Container>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버페이지임</div>} />
          <Route path="location" element={<div>위치정보페이지임</div>} />
        </Route>
        <Route path="event" element={<Event />}>
          <Route
            path="one"
            element={<div>첫 주문시 양배추즙 서비스</div>}
          ></Route>
          <Route path="two" element={<div>생일 기념 쿠폰받기</div>}></Route>
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

// 내가 한 방식
function Shoes(props) {
  return (
    <Col sm key={props.index}>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.shoes[props.index].id + 1) +
          ".jpg"
        }
        alt=""
        width="80%"
      />
      <h4>{props.shoes[props.index].title}</h4>
      <p>{props.shoes[props.index].content}</p>
    </Col>
  );
}

// // 다른 방식
// function Shoes(props) {
//   return (
//     <Col sm key={props.index}>
//       <img
//         src={
//           "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
//         }
//         alt=""
//         width="80%"
//       />
//       <h4>{props.shoes.title}</h4>
//       <p>{props.shoes.content}</p>
//     </Col>
//   );
// }

function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
