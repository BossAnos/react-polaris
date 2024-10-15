import { useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
  DropZone,
  Form,
  FormLayout,
  Icon,
  InlineError,
  LegacyStack,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { NoteIcon, XIcon } from "@shopify/polaris-icons";

function AddProduct({ onClose, handleAddProduct }) {
  const [data, setData] = useState({
    title: "",
    price: "",
    desc: "",
    file: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    desc: "",
    file: "",
  });

  const handleInputChange = useCallback((field) => (value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const handleError = () => {
    const newError = {};
    const { title, price } = data;

    if (title.trim() === "") {
      newError.title = "Title is required";
    }
    if (price.trim() === "" || isNaN(Number(price))) {
      newError.price = "Price is required and should be a number";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setData((prevData) => ({
        ...prevData,
        file: acceptedFiles[0],
      }));
    },
    []
  );

  const handleRemoveFile = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      file: "",
    }));
  }, []);

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !data.file && (
    <DropZone.FileUpload
      actionTitle="Add file"
      actionHint="Accepts .gif, .jpg, and .png"
    />
  );

  const uploadedFiles = data.file && (
    <div style={{ position: "relative", padding: "0" }}>
      <LegacyStack vertical>
        <LegacyStack alignment="center">
          <Thumbnail
            size="small"
            alt={data.file.name}
            source={
              validImageTypes.includes(data.file.type)
                ? window.URL.createObjectURL(data.file)
                : NoteIcon
            }
          />
          <div>
            {data.file.name}
            <Text variant="bodySm" as="p">
              {data.file.size} bytes
            </Text>
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-5%)",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={handleRemoveFile}
          >
            <Icon source={XIcon} tone="base" />
          </div>
        </LegacyStack>
      </LegacyStack>
    </div>
  );

  const handleSubmit = () => {
    if(!handleError) return;
    handleAddProduct(data);
    setData({ title: "", price: "", desc: "", file: "" });
    onClose();

    console.log("data:", data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={data.title}
          onChange={handleInputChange("title")}
          label="Title"
          autoComplete="off"
          error={errors.title}
        />
        <TextField
          value={data.price}
          onChange={handleInputChange("price")}
          label="Price"
          autoComplete="off"
          error={errors.price}
        />

        <DropZone
          label="Image"
          variableHeight
          onDrop={handleDropZoneDrop}
          disabled={Boolean(data.file)}
        >
          {uploadedFiles}
          {fileUpload}
        </DropZone>

        {errors.file && (
          <InlineError message={errors.file} fieldID="myFieldID" />
        )}

        <TextField
          value={data.desc}
          onChange={handleInputChange("desc")}
          label="Description"
          autoComplete="off"
        />

        <ButtonGroup>
          <Button onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </ButtonGroup>
      </FormLayout>
    </Form>
  );
}

export default AddProduct;
