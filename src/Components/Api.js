import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LoadingBox from "./LoadingBox";
import videoBg1 from "../Videos/pexels-mati-mango-6330773.mp4";

function Api() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

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
    <>
      <div className="site-container">
        <video src={videoBg1} autoPlay muted loop />
        <div className="content">
          <Container>
            <div className="fixed-search">
              <h1 className="text-center mt-4 heading">Am I breached</h1>
              <p className="text-center white">
                check whether the website is listed in data breach{" "}
              </p>
              <Form>
                <InputGroup className="my-3">
                  {/* onChange for search */}
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, title, domain"
                  />
                </InputGroup>
              </Form>
            </div>
            <div className="overlay">
              <Table hover>
                <thead>
                  <th>Name</th>
                  <th>Domain</th>
                </thead>
                <tbody>
                  {data ? (
                    data
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.Name.toLowerCase().includes(search);
                      })
                      .map((item) => (
                        <tr key={item.Name}>
                          <td>
                            <Link
                              className="link"
                              to={`/moreinfo/${item.Name}`}
                            >
                              {item.Name}
                            </Link>
                          </td>
                          <td>{item.Domain}</td>
                        </tr>
                      ))
                  ) : (
                    <LoadingBox />
                  )}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Api;
