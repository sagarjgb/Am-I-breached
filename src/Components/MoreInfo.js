import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import LoadingBox from "./LoadingBox";
import warningImage from "../Images/undraw_Warning_re_eoyh.png";

export default function MoreInfo() {
  const [data, setData] = useState();
  const parms = useParams();
  const { name } = parms;
  const search = name;
  console.log(name);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://haveibeenpwned.com/api/v2/breaches"
      );
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Container fluid>
        <h2 className="text-center">
          <span className="danger">Danger</span>
        </h2>
        <Row>
          <Col>
            <img className="warning" src={warningImage} alt="Warning Image" />
          </Col>
          <Col>
            {data ? (
              data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.Name.toLowerCase().includes(search);
                })
                .map((item) => (
                  <Row className="details">
                    <Col className="details-col" key={item.Name}>
                      <img
                        className="logo d-logo"
                        src={item.LogoPath}
                        alt="Logo"
                      />
                      <p>{item.Name}</p>
                      <a href={item.Domain}>{item.Domain}</a>
                      <p>
                        <span># </span>
                        {item.PwnCount}
                      </p>
                      {item.DataClasses.map((data) => (
                        <Badge bg="secondary" className="badge">
                          {data}
                        </Badge>
                      ))}
                    </Col>
                  </Row>
                ))
            ) : (
              <LoadingBox />
            )}
          </Col>
        </Row>
        <Row>
          {data ? (
            data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.Name.toLowerCase().includes(search);
              })
              .map((item) => (
                <>
                  <Col>
                    <span>Breach Date: </span>{item.BreachDate}
                  </Col>
                </>
              ))
          ) : (
            <LoadingBox />
          )}
        </Row>
      </Container>
    </div>
  );
}
