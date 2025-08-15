import React, { useState, useContext } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import { ngrok } from "../../utils/ngrok";

// Confirmation Modal Component
function MyVerticallyCenteredModal({ show, onHide, onConfirm }) {
  return (
    <Modal size="md" centered show={show} onHide={onHide}>
      <Modal.Header closeButton />
      <Modal.Body>
        <h4>Are you sure you want to cancel this form?</h4>
        <p>All of your input will be lost.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onHide();
            onConfirm();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const AddScholarship = () => {
  const navigate = useNavigate();
  const { adminLoggedIn } = useContext(UserContext);

  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    scholarshipName: "",
    deadline: "",
    amount: "",
    category: "",
    eligibility: "",
    documents: "",
    description: "",
  });

  // Update form fields dynamically
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      scholarshipName: "",
      deadline: "",
      amount: "",
      category: "",
      eligibility: "",
      documents: "",
      description: "",
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminLoggedIn) {
      alert("Unauthorized Access");
      return;
    }

    try {
      const res = await axios.post(`${ngrok}/createscholarships`, formData);
      if (res.data.success) {
        alert(res.data.message);
        resetForm();
        navigate("/adminDashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Container>
        <div className="pd-20 card-box mb-30">
          <div className="clearfix">
            <h3
              className="text-blue"
              style={{ color: "#2b50c7", textAlign: "center" }}
            >
              Create Scholarship Form
            </h3>
          </div>

          <Form className="bg-transparent" onSubmit={handleSubmit}>
            <Container>
              {/* Scholarship Name */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Scholarship Name <span className="compulsory">*</span>
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Scholarship Name"
                    value={formData.scholarshipName}
                    onChange={handleChange("scholarshipName")}
                    required
                  />
                </Col>
              </Form.Group>

              {/* Deadline, Amount, Category */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Deadline <span className="compulsory">*</span>
                </Form.Label>
                <Col md={2}>
                  <Form.Control
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange("deadline")}
                    required
                  />
                </Col>

                <Form.Label column md={1}>
                  Amount <span className="compulsory">*</span>
                </Form.Label>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    value={formData.amount}
                    onChange={handleChange("amount")}
                    required
                  />
                </Col>

                <Form.Label column md={1}>
                  Category <span className="compulsory">*</span>
                </Form.Label>
                <Col md={4}>
                  <Form.Select
                    value={formData.category}
                    onChange={handleChange("category")}
                    required
                  >
                    <option value="">Choose Scholarship Category</option>
                    <option value="merit-based">Merit</option>
                    <option value="minority-based">Minority</option>
                    <option value="need-based">Need based</option>
                    <option value="international">International</option>
                    <option value="research-based">Research Based</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Eligibility */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Eligibility Criteria <span className="compulsory">*</span>
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Eligibility Criteria"
                    value={formData.eligibility}
                    onChange={handleChange("eligibility")}
                    required
                  />
                </Col>
              </Form.Group>

              {/* Documents */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Documents Required <span className="compulsory">*</span>
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Documents Required"
                    value={formData.documents}
                    onChange={handleChange("documents")}
                    required
                  />
                </Col>
              </Form.Group>

              {/* Description */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2}>
                  Extra Information
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Add Extra information if any"
                    value={formData.description}
                    onChange={handleChange("description")}
                  />
                </Col>
              </Form.Group>

              {/* Buttons */}
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={() => setModalShow(true)}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </Container>

      {/* Cancel Modal */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={() => navigate("/merit-scholarships")}
      />
    </>
  );
};

export default AddScholarship;
