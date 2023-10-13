import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Button,
  Row,
  Col,
  Nav,
  Form,
  Modal,
} from "react-bootstrap";

function DataDisplay() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const recordPerPage = 3;

  useEffect(() => {
    // Fetch data from Node.js backend- added path in package.json
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  //searching
  const filteredData = data.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  // pagination
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //modal 
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  return (
    <Container className="my-3">
      <h3 className="text-center mb-3 mt-5">Company's Details</h3>
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Search by owner name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {records.length === 0 ? (
        <div className="text-center">No data to show</div>
      ) : (
        <div>
          <Row xs={1} className="g-4">
            {records.map((item, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    <Row xs={2} md={5}>
                      <Col>
                        <p className="fw-bold">Owner Name</p>
                        <p>{item.name}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Email</p>
                        <p>{item.email}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Mobile</p>
                        <p>{item.phone}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Company</p>
                        <p>{item.company.name}</p>
                      </Col>
                      <Col className="m-auto text-center">
                        <Button
                          onClick={() => openModal(item)}
                        >
                          Details
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* pagination */}
          <Nav className="d-flex justify-content-center my-3">
            <ul className="pagination">
              <li className="page-item">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`page-link ${prevDisabled ? "disabled" : ""}`}
                >
                  Previous
                </Button>
              </li>
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <Button
                    onClick={() => handlePageChange(number)}
                    className={`page-link ${
                      currentPage === number ? "active" : ""
                    } mx-2`}
                  >
                    {number}
                  </Button>
                </li>
              ))}
              <li className="page-item">
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`page-link ${nextDisabled ? "disabled" : ""}`}
                >
                  Next
                </Button>
              </li>
            </ul>
          </Nav>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Row md={3} xs={1}>
                <Col>
                        <p className="fw-bold">Name</p>
                        <p>{selectedItem.name}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Email</p>
                        <p>{selectedItem.email}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Mobile</p>
                        <p>{selectedItem.phone}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Address</p>
                        <p>Street : {selectedItem.address.street}</p>
                        <p>Suite : {selectedItem.address.suite}</p>
                        <p>City : {selectedItem.address.city}</p>
                        <p>ZipCode : {selectedItem.address.zipcode}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Website</p>
                        <p>{selectedItem.website}</p>
                      </Col>
                      <Col>
                        <p className="fw-bold">Company</p>
                        <p>Name: {selectedItem.company.name}</p>
                        <p>Idea: {selectedItem.company.catchPhrase}</p>
                        <p>Work: {selectedItem.company.bs}</p>
                      </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DataDisplay;
