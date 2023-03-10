import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LoadingBox from "./LoadingBox";

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
      <div className="d-flex flex-column site-container">
        <Container>
          <h1 className="text-center mt-4">Am I breached</h1>
          <Form>
            <InputGroup className="my-3">
              {/* onChange for search */}
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, title, domain"
              />
            </InputGroup>
          </Form>
          <Table striped bordered hover>
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
                        <Link className="link" to={`/moreinfo/${item.Name}`}>
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
        </Container>
      </div>
    </>
  );
}

export default Api;
