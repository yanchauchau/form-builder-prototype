import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Input,
  Menu,
  Fieldset,
  IconButton,
  Textarea,
  Field,
  Portal,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { RiExpandUpDownLine, RiDeleteBin6Line } from "react-icons/ri";
import { useForm, useFieldArray } from "react-hook-form";
import { Tooltip } from "@/components/ui/tooltip";
import { getNewQuestionTemplate } from "@/lib/context/FormConfigContext";

const TYPE_LABELS = {
  "new-question-text": "Question",
  "new-text": "Text",
  "new-choice": "Choice",
  "new-multiselect": "Multi-Select",
};

const BuildForm = ({ questions, setQuestions }) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions, // <- use passed-in config
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });


  // Initialize localQuestions with fields directly
  const [localQuestions, setLocalQuestions] = useState(fields);

  // Effect to sync local state with form state (for subsequent updates)
  useEffect(() => {
    setLocalQuestions(fields);
  }, [fields,]);

  


  // Handle input changes and update both form state and parent state
  const handleInputChange = (index, fieldName, value) => {
    setValue(`questions.${index}.${fieldName}`, value); // Update react-hook-form state
  
    // Update local state
    const updatedQuestions = [...localQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [fieldName]: value,
    };
    setLocalQuestions(updatedQuestions);
  
    // Update parent state if there's a real change
    setQuestions(updatedQuestions); // Directly update parent state (form config)
  };
  

  // Handle adding a new question
  const handleAddQuestion = () => {
    const newQuestion = getNewQuestionTemplate(fields.length + 1);
    append(newQuestion);
  };

  // Handle removing a question
  const handleRemoveQuestion = (index) => {
    remove(index);
  };

  return (
    <Box w="100%" h="100%" display="flex" flexDir="column" gap="l">
      <Box w="100%" h="100%" display="flex" flexDir="column" gap="m">
        {fields.map((field, index) => {
          const selectedType = localQuestions[index]?.type || "new-question-text";

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
            >
              {/* Order Input */}
              <GridItem
                rowSpan={2}
                colSpan={1}
                p="s"
                bg="gray.50"
                borderRadius="md"
                display="flex"
                flexDir="column"
                alignItems="start"
                justifyContent="space-between"
              >
                <Field.Root className="order">
                  <Input
                    bg="white"
                    {...register(`questions.${index}.order`)}
                  />
                  {errors.questions?.[index]?.order && (
                    <p style={{ color: "red" }}>
                      {errors.questions[index].order.message}
                    </p>
                  )}
                </Field.Root>
                <Tooltip
                  content={
                    fields.length === 1 || index === 0
                      ? "You must have at least 1 field or text"
                      : "Remove question"
                  }
                >
                  <IconButton
                    aria-label="Remove question"
                    colorPalette="red"
                    size="sm"
                    variant="ghost"
                    disabled={index === 0 || fields.length === 1}
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    <RiDeleteBin6Line />
                  </IconButton>
                </Tooltip>
              </GridItem>

              {/* Type Selector */}
              <GridItem
                colSpan={4}
                p="s"
                display="flex"
                gap="s"
                alignItems="center"
                justifyContent="space-between"
              >
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
                              handleInputChange(index, "type", value)
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
              <GridItem colSpan={4} px="s" py="s">
                {selectedType === "new-question-text" && (
                  <Field.Root>
                    <Field.Label>Question text</Field.Label>
                    <Textarea
                      value={localQuestions[index]?.questionText || ""}
                      onChange={(e) =>
                        handleInputChange(index, "questionText", e.target.value)
                      }
                    />
                  </Field.Root>
                )}

                {selectedType === "new-text" && (
                  <Field.Root>
                    <Field.Label>Text</Field.Label>
                    <Input
                      value={localQuestions[index]?.textResponse || ""}
                      onChange={(e) =>
                        handleInputChange(index, "textResponse", e.target.value)
                      }
                    />
                  </Field.Root>
                )}

                {selectedType === "new-choice" && (
                  <Fieldset.Root>
                    <Field.Root>
                      <Field.Label>Question text</Field.Label>
                      <Textarea
                        value={localQuestions[index]?.questionText || ""}
                        onChange={(e) =>
                          handleInputChange(index, "questionText", e.target.value)
                        }
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Choice Options</Field.Label>
                      <Input
                        value={localQuestions[index]?.questionOptions || ""}
                        onChange={(e) =>
                          handleInputChange(index, "questionOptions", e.target.value)
                        }
                      />
                    </Field.Root>
                  </Fieldset.Root>
                )}

                {selectedType === "new-multiselect" && (
                  <Fieldset.Root>
                    <Field.Root>
                      <Field.Label>Question text</Field.Label>
                      <Textarea
                        value={localQuestions[index]?.questionText || ""}
                        onChange={(e) =>
                          handleInputChange(index, "questionText", e.target.value)
                        }
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Multi-Select</Field.Label>
                      <Input
                        value={localQuestions[index]?.questionOptions || ""}
                        onChange={(e) =>
                          handleInputChange(index, "questionOptions", e.target.value)
                        }
                      />
                    </Field.Root>
                  </Fieldset.Root>
                )}
              </GridItem>
            </Grid>
          );
        })}

        <Button
          onClick={handleAddQuestion}
          colorPalette="blue"
          size="md"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default BuildForm;
