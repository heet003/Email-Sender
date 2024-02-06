import React, { useState } from "react";
import Input from "../Input/Input";
import Notification from "../Notification/Notification";
import { VALIDATOR_EMAIL } from "../util/validator";
import Loader from "../UIElements/LoadingSpinner";
import "./Form.css";

function Form(props) {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/sent/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEmailSent(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      {emailSent && (
        <Notification message="Email Sent Succesfully!" isSuccess />
      )}
      {error && <Notification message={error} />}
      {isLoading && <Loader asOverlay/>}
      <form onSubmit={submitHandler} action="/sent" method="post">
        <Input
          type="email"
          name="email"
          id="emailId"
          label="To Email"
          value={formData.email}
          validators={[VALIDATOR_EMAIL()]}
          placeholder="Enter your email."
          onChange={handleChange}
        />
        <Input
          type="text"
          id="subject"
          name="subject"
          label="Subject"
          value={formData.subject}
          placeholder="Enter subject of your email."
          onChange={handleChange}
        />
        <Input
          textarea
          id="body"
          name="body"
          label="Message"
          value={formData.body}
          placeholder="Enter the body of your message."
          onChange={handleChange}
        />
        <button type="submit">SEND EMAIL</button>
      </form>
    </div>
  );
}

export default Form;
