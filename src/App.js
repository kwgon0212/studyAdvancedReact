import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import mainImg from "./img/bg.png";
import { useState } from "react";
import shoesData from "./data";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  let [shoes] = useState(shoesData);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">신발#</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + mainImg + ")" }}
              ></div>

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
        <Route path="/detail" element={<div>상세페이지임</div>} />
        <Route path="/about" element={<div>about페이지임</div>} />
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
          (props.index + 1) +
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

export default App;
