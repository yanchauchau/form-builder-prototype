import { useState, useEffect } from "react";
import "./App.css";
import BuildForm from "./components/HookForm";
import { generatePreview } from "./components/previewUtils";
import { Box, Link, Heading, Tabs, Text } from "@chakra-ui/react";
import { useColorMode, ColorModeButton } from "@/components/ui/color-mode";
import { RiInsertRowBottom } from "react-icons/ri";
import { BiCodeCurly } from "react-icons/bi";
import JSONEditor from "@/components/JSONEditor";
import { FormConfigProvider } from "./lib/context/FormConfigContext";

function App() {
  const [questions, setQuestions] = useState([]);
  const [preview, setPreview] = useState([]);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    if (questions.length > 0) {
      const updatedPreview = generatePreview(questions); // no setValue needed here
      setPreview(updatedPreview);
      console.log("Questions updated:", questions);
    }
  }, [questions]);

  return (
    <>
      <FormConfigProvider>
      <Box display="flex" flexDir="column">
        <Box id="header" display="flex" py="l" px="m" w="100%" flexDir="row">
          <Box w="100%" display="flex" flexDir="column">
            <Heading
              as="h1"
              size="xl"
              w="fit-content"
              bg="linear-gradient(to left,rgb(123, 228, 31),rgb(2, 65, 137))"
              bgClip="text"
            >
              Form builder
            </Heading>
            <Text fontSize="xs">Last updated on 13 Apr 2025</Text>
          </Box>
          <ColorModeButton />
        </Box>
        <Box w="100%" display="flex" flexDir="row">
          <Box w="100%">
            <Tabs.Root defaultValue="ui-builder" variant="plain" py="l" px="m">
              <Tabs.List bg="bg.muted" rounded="l3" p="1">
                <Tabs.Trigger value="ui-builder" asChild>
                  <Link unstyled href="#UI">
                    <RiInsertRowBottom />
                    UI
                  </Link>
                </Tabs.Trigger>
                <Tabs.Trigger value="json-builder" asChild>
                  <Link unstyled href="#JSON-edtior">
                    <BiCodeCurly />
                    JSON
                  </Link>
                </Tabs.Trigger>
                <Tabs.Indicator rounded="l2" />
              </Tabs.List>
              <Tabs.Content value="ui-builder">
                <BuildForm questions={questions} setQuestions={setQuestions} />
              </Tabs.Content>
              <Tabs.Content value="json-builder">
                {" "}
                <JSONEditor />
              </Tabs.Content>
            </Tabs.Root>
          </Box>
          <Box
            w="100%"
            p="xs"
            spaceY="2"
            background="blue.50"
            id="preview-top-level"
            py="l"
            px="m"
          >
            <Heading as="h3" size="sm">
              Preview
            </Heading>

            {preview.length > 0
              ? preview.map((item, i) => <Box key={i}>{item}</Box>)
              : "No preview"}
          </Box>
        </Box>
      </Box>
    </>
  );
  </FormConfigProvider>}

export default App;
