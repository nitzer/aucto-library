import { useMutation } from "@tanstack/react-query";
import { addNewBook, queryClient } from "../../api/api";
import { useState } from "react";
import FormInput from "../UI/FormInput";
import { Modal, Form, Button } from "antd";

const bookInitialState = {
  title: "",
  description: "",
  releasedAt: "",
};

const AddBookForm = ({ authorId }) => {
  const [formData, setFormData] = useState(bookInitialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: ({ authorId, formData }) => addNewBook(authorId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["books", { id: authorId }]);
      setFormData(bookInitialState);

      // Close the form after two seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
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
    mutate({ authorId, formData });
  };

  return (
    <div>
      <Button onClick={showModal}>Add Book</Button>
      <Modal
        title="Add book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <FormInput
              type="text"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <FormInput
              label="Description"
              isTextarea={true}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <FormInput
              type="date"
              label="Date of Release"
              name="releasedAt"
              value={formData.releasedAt}
              onChange={handleChange}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBookForm;
