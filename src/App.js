import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import mainImg from "./img/bg.png";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import shoesData from "./data";
// import Detail from "./routes/Detail";
// import Cart from "./routes/Cart";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "react-query";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

const Detail = lazy(() => import("./routes/Detail"));
const Cart = lazy(() => import("./routes/Cart"));

export let Context1 = createContext();

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched") == null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let [shoes, setShoes] = useState(shoesData);
  let navigate = useNavigate();
  let [btnCount, setBtnCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [재고] = useState([19, 10, 11]);

  let result = useQuery(
    ["userName"],
    () => {
      return axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((a) => {
          return a.data;
        });
    },
    { staleTime: 2000 }
  );

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">신발#</Navbar.Brand>
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
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {result.isLoading && "로딩중..."}
            {result.error && "에러남"}
            {result.data && "안녕하세요 " + result.data.name + " 님!"}
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Suspense fallback={<div>로딩중...</div>}>
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

                {loading == false ? null : <div>Loading...</div>}
                {btnCount >= 2 ? (
                  <div>더 이상 상품이 존재하지 않습니다.</div>
                ) : (
                  <button
                    onClick={() => {
                      setBtnCount(btnCount + 1);
                      setLoading(true);
                      axios
                        .get(
                          `https://codingapple1.github.io/shop/data${
                            btnCount + 2
                          }.json`
                        )
                        .then((result) => {
                          let copy = [...shoes, ...result.data];
                          setShoes(copy);
                          setLoading(false);
                        })
                        .catch(() => {
                          console.log("실패함");
                          setLoading(false);
                        });
                    }}
                  >
                    더보기
                  </button>
                )}
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart></Cart>}></Route>
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
      </Suspense>
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
        alt="이미지 로딩안됨"
        width="80%"
      />
      <Link to={"/detail/" + props.index}>
        <h4>{props.shoes[props.index].title}</h4>
      </Link>
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
