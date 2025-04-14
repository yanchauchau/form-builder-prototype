// previewUtils.js
import { Stack, Text, Heading, Checkbox, RadioGroup } from "@chakra-ui/react";
export const generatePreview = (questions, setValue) => {
  const sortedQuestions = [...questions].sort((a, b) => a.order - b.order);
  return sortedQuestions.map((field, index) => {
    const {
      id,
      type,
      questionText,
      textResponse,

      selectedChoice,
      questionOptions,
      selectedMulti = [],
    } = field;

    if (type === "new-question-text" && questionText) {
      return (
        <Stack key={id} p={4} bg="white" borderRadius="md">
          <Text textStyle="2xs" color="GrayText">
            Question
          </Text>
          <Heading size="2xl" fontWeight="normal">
            {questionText}
          </Heading>
        </Stack>
      );
    }

    if (type === "new-text" && textResponse) {
      return (
        <Stack key={id} p={4} bg="white" borderRadius="md">
          <Text textStyle="2xs" color="GrayText">
            Text
          </Text>
          <Text>{textResponse}</Text>
        </Stack>
      );
    }

    if (type === "new-choice" && questionOptions) {
      const options = questionOptions
        .split(",")
        .map((opt) => opt.trim())
        .filter(Boolean);

      return (
        <Stack key={id} p={4} bg="white" borderRadius="md">
          <Text color="GrayText" textStyle="xs">
            Choice
          </Text>
          {questionText && (
            <Text size="s" mb={2}>
              {questionText}
            </Text>
          )}
          <RadioGroup.Root
            value={selectedChoice}
            onChange={(val) => {
              const cleanValue = val.split("-")[0];
              setValue?.(`questions.${index}.selectedChoice`, cleanValue);
            }}
          >
            <Stack direction="column" spacing={4}>
              {options.map((opt, i) => {
                const value = `${opt}-${i}`;
                return (
                  <RadioGroup.Item key={value} value={value}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{opt}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                );
              })}
            </Stack>
          </RadioGroup.Root>
          {selectedChoice && (
            <Text fontWeight="bold">Selected: {selectedChoice}</Text>
          )}
        </Stack>
      );
    }

    if (type === "new-multiselect" && questionOptions) {
      const options = questionOptions.split(",").map((opt) => opt.trim());

      return (
        <Stack key={id} p={4} bg="white" borderRadius="md">
          <Text color="GrayText" textStyle="xs">
            Multi-select
          </Text>
          {questionText && (
            <Text size="s" mb={2}>
              {questionText}
            </Text>
          )}

          {options.map((opt, i) => (
            <Checkbox.Root
              key={i}
              value={opt}
              onChange={(e) => {
                const newSelection = e.target.checked
                  ? [...selectedMulti, opt]
                  : selectedMulti.filter((item) => item !== opt);
                setValue?.(`questions.${index}.selectedMulti`, newSelection);
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              {opt}
            </Checkbox.Root>
          ))}

          {selectedMulti.length > 0 && (
            <Text fontWeight="bold">Selected: {selectedMulti.join(", ")}</Text>
          )}
        </Stack>
      );
    }

    return null;
  });
};
