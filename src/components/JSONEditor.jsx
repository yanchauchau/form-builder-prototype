import { Textarea, Button, Box, Text, Stack, Center } from "@chakra-ui/react";
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

const handleApply = () => {
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array");
    }

    const valid = validate(parsed);
    if (!valid) {
      throw new Error("Schema validation failed: " + ajv.errorsText(validate.errors));
    }

    onChange(parsed);
    setError(null);
  } catch (e) {
    setError(e.message);
  }
};



const JsonEditor = ({ value, onChange }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const formatted = JSON.stringify(value, null, 2);
      setText(formatted);
    } catch {
      setText("[]");
    }
  }, [value]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array");
      }
      onChange(parsed);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Stack spacing={4}>
     <Stack display="flex" flexDir="row" alignItems="center" justifyContent="space-between"><Text>Ediotr</Text> <JSONExportButton /></Stack> 
      <Textarea
        value={text}
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
