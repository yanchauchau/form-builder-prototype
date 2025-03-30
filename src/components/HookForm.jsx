"use client";

import { Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonCustom as Button, LabelCustom as Label } from "@/theme/theme";

const BuildForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button>Text</Button>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Stack gap="4" className="question-object">
          <Stack>
            <Label>Question text</Label>
            <Input
              {...register("qText", { required: "Question text is required" })}
            />

            {errors.qText && (
              <p style={{ color: "red" }}>{errors.qText.message}</p>
            )}
          </Stack>

          <Stack>
            <Label>Last name</Label>
            <Input
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName.message}</p>
            )}
          </Stack>
        </Stack>

        <Button type="submit" >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default BuildForm;
