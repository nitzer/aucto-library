import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addNewAuthor, queryClient } from "../../api/api";
import { Alert, Button, Form, Modal } from "antd";
import FormInput from "../UI/FormInput";

const authorInitialData = {
  firstName: "",
  lastName: "",
};

const AddAuthorForm = () => {
  const [formData, setFormData] = useState(authorInitialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: addNewAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
      setFormData(authorInitialData);
      setTimeout(() => {setIsModalOpen(false)}, 2000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    mutate(formData);
  };

  return (
    <div>
      <Button onClick={showModal}>Add Author</Button>
      <Modal
        title="Add Author"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <div>
          {isPending && "Adding author"}
          {isError && <Alert message={`An error occurred: ${error.info?.message || "An error occurred"}`} type="warning" /> }
          {isSuccess && <Alert message="Author added!" type="success" showIcon />}
        </div>
        <Form form={form} onFinish={handleSubmit}>
          <FormInput
            type="text"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddAuthorForm;
