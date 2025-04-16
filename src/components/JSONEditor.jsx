import { Textarea, Button, Box, Text, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JSONExportButton from "./JSONExportButton";
import Ajv from "ajv";

const ajv = new Ajv();
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" }
    },
    required: ["name", "age"],
    additionalProperties: false
  }
};
const validate = ajv.compile(schema);

const JsonEditor = ({ value, onChange }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // When the value (form config) changes, update the textarea
  useEffect(() => {
    if (value && value.length > 0) {
      try {
        const formatted = JSON.stringify(value, null, 2);
        setText(formatted); // Set the formatted JSON text in the textarea
      } catch {
        setText("[]"); // Default to an empty array if value is invalid
      }
    } else {
      setText("[]"); // Set default empty array if value is undefined or empty
    }
  }, [value]); // Update whenever 'value' changes

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array");
      }

      // If the JSON is valid, apply changes and trigger onChange
      onChange(parsed);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Stack spacing={4}>
      <Stack display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
        <Text>Editor</Text>
        <JSONExportButton />
      </Stack>
      <Textarea
        value={text} // This is the state variable that should hold the formatted JSON
        onChange={(e) => setText(e.target.value)}
        fontFamily="mono"
        height="400px"
        resize="vertical"
        placeholder="Edit JSON array here..."
      />
      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
      <Box>
        <Button onClick={handleApply} colorScheme="blue">
          Apply Changes
        </Button>
      </Box>
    </Stack>
  );
};

export default JsonEditor;
