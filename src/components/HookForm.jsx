import {
  Button,
  Input,
  Stack,
  Menu,
  Portal,
  Grid,
  GridItem,
  Text,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
} from "@chakra-ui/react";
import { LabelCustom as Label } from "@/theme/theme";
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
  const { register, setValue, watch, formState: { errors } } = useForm();
  const selectedType = watch("selection", "new-question-text"); 
  const questionText = watch("questionText", "");
  const textResponse = watch("textResponse", "");
  const choiceOptions = watch("choiceOptions", "");
  const selectedChoice = watch("selectedChoice", "");
  const multiSelectOptions = watch("multiSelectOptions", "");
  const selectedMulti = watch("selectedMulti", []);
  const handleMenuSelect = (value) => { 
    setValue("selection", value);
  };

  // Effect for Question section
  useEffect(() => {
    if (questionText) {
      setPreview(
        <Stack p={4} border="1px solid #ccc">
          <Text fontWeight="bold">Question:</Text>
          <Text>{questionText}</Text>
        </Stack>
      );
    }
  }, [questionText, setPreview]);

  // Effect for Text Response section
  useEffect(() => {
    if (textResponse) {
      setPreview(
        <Stack p={4} border="1px solid #ccc">
          <Text fontWeight="bold">Text Response:</Text>
          <Text>{textResponse}</Text>
        </Stack>
      );
    }
  }, [textResponse, setPreview]);

  // Effect for Choice section
  useEffect(() => {
    if (choiceOptions) {
      const optionsArray = choiceOptions.split(",").map((opt) => opt.trim());
      setPreview(
        <Stack p={4} border="1px solid #ccc">
          <Text fontWeight="bold">Choice Options:</Text>
          <RadioGroup.Root value={selectedChoice}>
            {optionsArray.map((opt, index) => (
              <RadioGroup.Item key={index} value={opt}>
                {opt}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          {selectedChoice && <Text fontWeight="bold">Selected: {selectedChoice}</Text>}
        </Stack>
      );
    }
  }, [choiceOptions, selectedChoice, setPreview]);

  // Effect for Multi-Select section
  useEffect(() => {
    if (multiSelectOptions) {
      const optionsArray = multiSelectOptions.split(",").map((opt) => opt.trim());
      setPreview(
        <Stack p={4} border="1px solid #ccc">
          <Text fontWeight="bold">Multi-Select Options:</Text>
          <CheckboxGroup value={selectedMulti}>
            {optionsArray.map((opt, index) => (
              <Checkbox key={index} value={opt}>
                {opt}
              </Checkbox>
            ))}
          </CheckboxGroup>
          {selectedMulti.length > 0 && <Text fontWeight="bold">Selected: {selectedMulti.join(", ")}</Text>}
        </Stack>
      );
    }
  }, [multiSelectOptions, selectedMulti, setPreview]);

  return (
    <Stack gap="4">
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4} borderWidth="2px">
        <GridItem rowSpan={2} colSpan={1} borderWidth="2px" alignContent="center" p="xs">
          <Stack className="field">
            <Label>Order</Label>
            <Input {...register("order", { required: "Order is required" })} />
            {errors.order && <p style={{ color: "red" }}>{errors.order.message}</p>}
          </Stack>
        </GridItem>

        <GridItem colSpan={4} p="xs" borderWidth="2px" display="flex" gap="s">
          <Stack className="field">
            <Label>Last Name</Label>
            <Input {...register("lastName", { required: "Last name is required" })} />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName.message}</p>}
          </Stack>

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
                    <Menu.Item key={value} onClick={() => handleMenuSelect(value)}>
                      {label}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </GridItem>

        <GridItem colSpan={4} borderWidth="2px" p="4">
          {selectedType === "new-question-text" && (
            <Stack className="field">
              <Label>Question text</Label>
              <Input {...register("questionText", { required: "Question text is required" })} />
              {errors.questionText && <p style={{ color: "red" }}>{errors.questionText.message}</p>}
            </Stack>
          )}

          {selectedType === "new-text" && (
            <Stack className="field">
              <Label>Text Response</Label>
              <Input {...register("textResponse", { required: "Response is required" })} />
              {errors.textResponse && <p style={{ color: "red" }}>{errors.textResponse.message}</p>}
            </Stack>
          )}

          {selectedType === "new-choice" && (
            <Stack className="field">
              <Label>Choice Options (comma separated)</Label>
              <Input {...register("choiceOptions", { required: "Choices are required" })} />
              {errors.choiceOptions && <p style={{ color: "red" }}>{errors.choiceOptions.message}</p>}
            </Stack>
          )}

          {selectedType === "new-multiselect" && (
            <Stack className="field">
              <Label>Multi-Select Options (comma separated)</Label>
              <Input {...register("multiSelectOptions", { required: "Options are required" })} />
              {errors.multiSelectOptions && <p style={{ color: "red" }}>{errors.multiSelectOptions.message}</p>}
            </Stack>
          )}
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default BuildForm;
