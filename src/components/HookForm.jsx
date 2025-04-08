import { useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Stack,
  Menu,
  Heading,
  Fieldset,
  Field,
  Portal,
  Grid,
  GridItem,
  Text,
  Checkbox,
  RadioGroup,
} from "@chakra-ui/react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useForm, useFieldArray } from "react-hook-form";

const TYPE_LABELS = {
  "new-question-text": "Question",
  "new-text": "Text",
  "new-choice": "Choice",
  "new-multiselect": "Multi-Select",
};

const BuildForm = ({ setPreview }) => {
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [
        {
          id: Date.now(),
          type: "new-question-text",
          order: "",
          questionText: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  // Watch the entire questions array to reactively handle changes
  const questions = watch("questions");

  const generatePreview = (questions) => {
    return questions.map((field, index) => {
      const selectedType = field.type;
      const questionText = field.questionText || "";
      const textResponse = field.textResponse || "";
      const choiceOptions = field.choiceOptions || "";
      const selectedChoice = field.selectedChoice || "";
      const multiSelectOptions = field.multiSelectOptions || "";
      const selectedMulti = field.selectedMulti || [];

      if (selectedType === "new-question-text" && questionText) {
        return (
          <Stack key={field.id} p={4} bg="white" borderRadius="md" h="100%">
            <Text textStyle="2xs" color="GrayText">
              Question
            </Text>
            <Heading size="2xl" fontWeight="normal">
              {questionText}
            </Heading>
          </Stack>
        );
      }

      if (selectedType === "new-text" && textResponse) {
        return (
          <Stack key={field.id} p={4} bg="white" borderRadius="md" h="100%">
            <Text textStyle="2xs" color="GrayText">
              Text
            </Text>
            <Text>{textResponse}</Text>
          </Stack>
        );
      }

      if (selectedType === "new-choice" && choiceOptions) {
        const optionsArray = choiceOptions
          .split(",")
          .map((opt) => opt.trim())
          .filter(Boolean); // removes empty strings

        return (
          <Stack key={field.id} p={4} bg="white" borderRadius="md">
            <Text fontWeight="bold">Choice Options:</Text>
            <RadioGroup.Root
              value={selectedChoice}
              onChange={(val) => {
                const cleanValue = val.split("-")[0]; // remove "-0", "-1", etc
                setValue(`questions.${index}.selectedChoice`, cleanValue);
              }}
            >
              <Stack direction="column" spacing={4}>
                {optionsArray.map((opt, i) => {
                  const value = `${opt}-${i}`; // unique value
                  return (
                    <RadioGroup.Item key={value} value={value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{String(opt)}</RadioGroup.ItemText>
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

      if (selectedType === "new-multiselect" && multiSelectOptions) {
        const optionsArray = multiSelectOptions
          .split(",")
          .map((opt) => opt.trim());
        return (
          <Stack
            key={field.id}
            p={4}
            bg="white"
            borderRadius="md"
            className="preview"
          >
            <Text color="GrayText" textStyle="xs">
              Multi-select
            </Text>
            <Stack>
              {optionsArray.map((opt, i) => (
                <Checkbox.Root
                  key={i}
                  value={opt}
                  onChange={(e) => {
                    const newSelection = e.target.checked
                      ? [...selectedMulti, opt]
                      : selectedMulti.filter((item) => item !== opt);
                    setValue(`questions.${index}.selectedMulti`, newSelection);
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  {opt}
                </Checkbox.Root>
              ))}
            </Stack>
            {selectedMulti.length > 0 && (
              <Text fontWeight="bold">
                Selected: {selectedMulti.join(", ")}
              </Text>
            )}
          </Stack>
        );
      }

      return null;
    });
  };
  useEffect(() => {
    if (questions.length > 0 && setPreview) {
      const previewContent = generatePreview(questions);
      setPreview(previewContent);
    }
  }, [questions, setPreview]);

  return (
    <Box w="100%" h="100%" display="flex" flexDir="row" id="test">
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDir="column"
        gap="m"
        p="l"
        id="form"
      >
        {/* <Heading as="h3" size="md">
          Section heading
        </Heading> */}
        {fields.map((field, index) => {
          const selectedType = watch(
            `questions.${index}.type`,
            "new-question-text"
          );

          return (
            <Grid
              key={field.id}
              templateRows="repeat(2, auto)"
              templateColumns="repeat(5, 1fr)"
              rowGap={0}
              columnGap={0}
              gridAutoRows="auto"
              borderWidth="1px"
              borderRadius="md"
              className="question-element"
            >
              {/* Order Input */}
              <GridItem rowSpan={2} colSpan={1} p="s" bg="gray.50">
                <Field.Root>
                  <Field.Label>Order</Field.Label>
                  <Input
                    {...register(`questions.${index}.order`, {
                      required: "Order is required",
                    })}
                  />
                  {errors.questions?.[index]?.order && (
                    <p style={{ color: "red" }}>
                      {errors.questions[index].order.message}
                    </p>
                  )}
                </Field.Root>
              </GridItem>

              {/* Type Selector */}
              <GridItem colSpan={4} p="s" display="flex" gap="sm">
                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button colorPalette="blue" size="md" variant="outline">
                      {TYPE_LABELS[selectedType]} <RiExpandUpDownLine />
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        {Object.entries(TYPE_LABELS).map(([value, label]) => (
                          <Menu.Item
                            key={value}
                            onClick={() =>
                              setValue(`questions.${index}.type`, value)
                            }
                            _hover={{ bg: "gray.100" }}
                          >
                            {label}
                          </Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </GridItem>

              {/* Input Fields Based on Type */}
              <GridItem colSpan={4} p="s">
                {selectedType === "new-question-text" && (
                  <Field.Root>
                    <Field.Label>Question text</Field.Label>
                    <Input
                      {...register(`questions.${index}.questionText`, {
                        required: "Required",
                      })}
                    />
                    {errors.questions?.[index]?.questionText && (
                      <p style={{ color: "red" }}>
                        {errors.questions[index].questionText.message}
                      </p>
                    )}
                  </Field.Root>
                )}

                {selectedType === "new-text" && (
                  <Field.Root>
                    <Field.Label>Text</Field.Label>
                    <Input
                      {...register(`questions.${index}.textResponse`, {
                        required: "Required",
                      })}
                    />
                    {errors.questions?.[index]?.textResponse && (
                      <p style={{ color: "red" }}>
                        {errors.questions[index].textResponse.message}
                      </p>
                    )}
                  </Field.Root>
                )}

                {selectedType === "new-choice" && (
                  <Fieldset.Root>
                    <Field.Root>
                      <Field.Label>Question text</Field.Label>
                      <Input
                        {...register("questionTextforChoice", {
                          required: "Question text is required",
                        })}
                      />
                      {errors.questionTextforChoice && (
                        <p style={{ color: "red" }}>
                          {errors.questionTextforChoice.message}
                        </p>
                      )}
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Choice Options</Field.Label>
                      <Input
                        {...register(`questions.${index}.choiceOptions`, {
                          required: "Required",
                        })}
                      />
                      {errors.questions?.[index]?.choiceOptions && (
                        <p style={{ color: "red" }}>
                          {errors.questions[index].choiceOptions.message}
                        </p>
                      )}
                    </Field.Root>
                  </Fieldset.Root>
                )}

                {selectedType === "new-multiselect" && (
                  <Field.Root>
                    <Field.Label>Multi-Select</Field.Label>
                    <Input
                      {...register(`questions.${index}.multiSelectOptions`, {
                        required: "Required",
                      })}
                    />
                    {errors.questions?.[index]?.multiSelectOptions && (
                      <p style={{ color: "red" }}>
                        {errors.questions[index].multiSelectOptions.message}
                      </p>
                    )}
                  </Field.Root>
                )}
              </GridItem>
            </Grid>
          );
        })}

        <Button
          onClick={() =>
            append({
              id: Date.now(),
              type: "new-question-text",
              order: "",
              questionText: "",
            })
          }
          colorPalette="blue"
          size="md"
        >
          Add
        </Button>
      </Box>
      {/* Preview Section */}
      <Box w="100%" p="l" spaceY="2" background="blue.50" id="preview">
        <Stack>
          <Text>Preview</Text>
          {generatePreview(questions)}
        </Stack>
      </Box>
    </Box>
  );
};

export default BuildForm;
