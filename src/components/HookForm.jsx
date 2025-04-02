import {

  Button,
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
  CheckboxGroup,
  RadioGroup,
} from "@chakra-ui/react";
// import { LabelCustom as Label } from "@/theme/theme";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TYPE_LABELS = {
  "new-question-text": "Question",
  "new-text": "Text",
  "new-choice": "Choice",
  "new-multiselect": "Multi-Select",
};

const BuildForm = ({ setPreview }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const selectedType = watch("selection", "new-question-text");
  const questionText = watch("questionText", "");
  const textResponse = watch("textResponse", "");
  const choiceOptions = watch("choiceOptions", "");
  const selectedChoice = watch("selectedChoice", "");
  const multiSelectOptions = watch("multiSelectOptions", "");
  const selectedMulti = watch("selectedMulti", "");
  const handleMenuSelect = (value) => {
    setValue("selection", value);
  };

  // Effect for Question section
  useEffect(() => {
    if (questionText) {
      setPreview(
        <Stack p={4} border="1px solid #ccc" bg="white" borderRadius="md">
  
           <Heading size="lg" fontWeight="normal">{questionText}</Heading>
        </Stack>
      );
    }
  }, [questionText, setPreview]);

  // Effect for Text Response section
  useEffect(() => {
    if (textResponse) {
      setPreview(
   <Stack p={4} border="1px solid #ccc" bg="white" borderRadius="md">
          <Text fontWeight="bold">Text Response:</Text>
          <Text>{textResponse}</Text>
        </Stack>
      );
    }
  }, [textResponse, setPreview]);

  // Effect for Choices section

  useEffect(() => {
    if (choiceOptions) {
      const optionsArray = choiceOptions.split(",").map((opt) => opt.trim());

      setPreview(
   <Stack p={4} border="1px solid #ccc" bg="white" borderRadius="md" >
          <Text fontWeight="bold">Choice Options:</Text>

          <RadioGroup.Root
            value={selectedChoice}
            onValueChange={(val) => {
              if (
                typeof val === "object" &&
                val !== null &&
                val.hasOwnProperty("value")
              ) {
                setValue("selectedChoice", val.value);
              } else {
                console.error(
                  "RadioGroup value is not the expected object:",
                  val
                );
              }
            }}
            aria-label="Choice Selection"
          >
            <Stack dir="row" g="s">
              {optionsArray.map((opt, index) => (
                <RadioGroup.Item
                  key={`${opt}-${index}`}
                  value={`${opt}-${index}`}
                >
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{opt}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </Stack>
          </RadioGroup.Root>

          {selectedChoice && (
            <Text fontWeight="bold">Selected: {selectedChoice}</Text>
          )}
        </Stack>
      );
    }
  }, [choiceOptions, selectedChoice, setPreview, setValue]);

  // Effect for Multi-Select section
  useEffect(() => {
    if (multiSelectOptions) {
      const optionsArray = multiSelectOptions
        .split(",")
        .map((opt) => opt.trim());
      setPreview(
   <Stack p={4} border="1px solid #ccc" bg="white" borderRadius="md">
          <Text fontWeight="bold">Multi-Select Options:</Text>
          <Stack value={selectedMulti}>
            {optionsArray.map((opt, index) => (
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                {opt}
              </Checkbox.Root>
            ))}
          </Stack>
          {selectedMulti.length > 0 && (
            <Text fontWeight="bold">Selected: {selectedMulti.join(", ")}</Text>
          )}
        </Stack>
      );
    }
  }, [multiSelectOptions, selectedMulti, setPreview]);

  return (
    <Stack gap="4">
      <Grid
        templateRows="repeat(2, auto)"
        templateColumns="repeat(5, 1fr)"
        rowGap="s"
        columnGap={0}
        gridAutoRows="auto"
        borderWidth="1px"
        borderRadius="md"
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          alignContent="center"
          roundedLeft="md"

          p="xs"
          bg="gray.50"
        >
          <Field.Root>
            <Field.Label>Order</Field.Label>
            <Input {...register("order", { required: "Order is required" })} />
            {errors.order && (
              <p style={{ color: "red" }}>{errors.order.message}</p>
            )}
          </Field.Root>
        </GridItem>

        <GridItem colSpan={4} p="xs" display="flex" gap="s">
          {/* <Field.Root>
            <Field.Label>Last Name</Field.Label>
            <Input
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName.message}</p>
            )}
          </Field.Root> */}
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
                      onClick={() => handleMenuSelect(value)}
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

        <GridItem colSpan={4} p="xs" gap="s">
          {selectedType === "new-question-text" && (
            <Field.Root>
              <Field.Label>Question text</Field.Label>
              <Input
                {...register("questionText", {
                  required: "Question text is required",
                })}
              />
              {errors.questionText && (
                <p style={{ color: "red" }}>{errors.questionText.message}</p>
              )}
            </Field.Root>
          )}

          {selectedType === "new-text" && (
            <Field.Root>
              <Field.Label>Text Response</Field.Label>
              <Input
                {...register("textResponse", {
                  required: "Response is required",
                })}
              />
              {errors.textResponse && (
                <p style={{ color: "red" }}>{errors.textResponse.message}</p>
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
                <Field.Label>Choice Options (comma separated)</Field.Label>
                <Input
                  {...register("choiceOptions", {
                    required: "Choices are required",
                  })}
                />
                {errors.choiceOptions && (
                  <p style={{ color: "red" }}>{errors.choiceOptions.message}</p>
                )}
              </Field.Root>
              
            </Fieldset.Root>
          )}

          {selectedType === "new-multiselect" && (
            <Field.Root>
              <Field.Label>Multi-Select Options (comma separated)</Field.Label>
              <Input
                {...register("multiSelectOptions", {
                  required: "Options are required",
                })}
              />
              {errors.multiSelectOptions && (
                <p style={{ color: "red" }}>
                  {errors.multiSelectOptions.message}
                </p>
              )}
            </Field.Root>
          )}
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default BuildForm;
