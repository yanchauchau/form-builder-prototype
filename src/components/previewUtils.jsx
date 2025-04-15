// previewUtils.js
import { Stack, Text, Heading, Checkbox, RadioGroup } from "@chakra-ui/react";
export const generatePreview = (localQuestions, setValue) => {
  // Change questions to localQuestions
  console.log("generatePreview localQuestions", localQuestions); // Add this log

  const sortedQuestions = [...localQuestions].sort((a, b) => a.order - b.order); // Use localQuestions here
  return sortedQuestions.map((field, index) => {
    const {
      id,
      order,
      type,
      questionText,
      textResponse,
      selectedChoice,
      questionOptions,
      selectedMulti = [],
    } = field;

    if (type === "new-question-text" && questionText) {
      return (
        <Stack
          key={id}
          p={4}
          bg="white"
          borderRadius="md"
          display="flex"
          flexDir="row"
          flexWrap="wrap"
        >
          <Stack
            display="flex"
            flexDir="row"
            gap="xxs"
            flexGrow="3"
            flexShrink="1"
          >
            <Heading size="2xl" fontWeight="normal">
              {questionText}
            </Heading>
          </Stack>
          <Stack
            display="flex"
            flexDir="row"
            gap="xxs"
            flexGrow="1"
            justifyContent="end"
          >
            <Text textStyle="2xs" color="GrayText">
              {order} Question
            </Text>
          </Stack>
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
      const options = Array.isArray(questionOptions)
        ? questionOptions
        : (questionOptions || "")
            .split(",")
            .map((opt) => opt.trim())
            .filter(Boolean);

      return (
        <Stack
          key={id}
          p={4}
          bg="white"
          borderRadius="md"
          display="flex"
          flexDir="row"
          flexWrap="wrap"
        >
          <Stack
            display="flex"
            flexDir="column"
            gap="xxs"
            flexGrow="3"
            flexShrink="1"
          >
            {questionText && (
              <Text size="s" mb={2}>
                {questionText}
              </Text>
            )}
            <RadioGroup.Root
              value={selectedChoice}
              onChange={(val) => {
                const cleanValue =
                  typeof val === "string" ? val.split("-")[0] : val;
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
          </Stack>
          <Stack
            display="flex"
            flexDir="row"
            gap="xxs"
            flexGrow="1"
            justifyContent="end"
          >
            <Text textStyle="2xs" color="GrayText">
              {order} Choice
            </Text>
          </Stack>
        </Stack>
      );
    }

    if (type === "new-multiselect" && questionOptions) {
      const options = Array.isArray(questionOptions)
        ? questionOptions
        : (questionOptions || "")
            .split(",")
            .map((opt) => opt.trim())
            .filter(Boolean);

      return (
        <Stack
          key={id}
          p={4}
          bg="white"
          borderRadius="md"
          display="flex"
          flexDir="row"
          flexWrap="wrap"
        >
          <Stack
            display="flex"
            flexDir="column"
            gap="xxs"
            flexGrow="3"
            flexShrink="1"
          >
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
          </Stack>
          <Stack
            display="flex"
            flexDir="row"
            gap="xxs"
            flexGrow="1"
            justifyContent="end"
          >
            <Text color="GrayText" textStyle="xs">
              {order} Multi-select
            </Text>
          </Stack>
        </Stack>
      );
    }

    return null;
  });
};
