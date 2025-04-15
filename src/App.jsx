import { useState, useEffect } from "react";
import "./App.css";
import BuildForm from "./components/HookForm";
import { generatePreview } from "./components/previewUtils";
import JSONEditor from "@/components/JSONEditor";
import { useFormConfig } from "./lib/context/FormConfigContext";
import { Box, Link, Heading, Tabs, Text } from "@chakra-ui/react";
import { useColorMode, ColorModeButton } from "@/components/ui/color-mode";
import { RiInsertRowBottom } from "react-icons/ri";
import { BiCodeCurly } from "react-icons/bi";


function App() {
  const { formConfig, setFormConfig } = useFormConfig();
  const [localQuestions, setLocalQuestions] = useState(formConfig.fields); // Initialize with formConfig.fields
  const [preview, setPreview] = useState([]);
  const { toggleColorMode } = useColorMode();

  console.log("localQuestions", localQuestions);
// 2. Sync localQuestions from formConfig.fields when formConfig is ready
  useEffect(() => {
    if (formConfig.fields?.length > 0) {
      setLocalQuestions(formConfig.fields);
    }
  }, [formConfig.fields]);


// 3. Re-generate preview when localQuestions change
useEffect(() => {
  if (localQuestions.length > 0) {
    const updatedPreview = generatePreview(localQuestions);
    setPreview(updatedPreview);
  }
}, [localQuestions]);

  

  return (
    <>
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
              <BuildForm
  questions={formConfig.fields}
  setQuestions={(updatedFields) => {
    setFormConfig({ ...formConfig, fields: updatedFields });
    setLocalQuestions(updatedFields); // triggers preview
  }}
/>

              </Tabs.Content>
              <Tabs.Content value="json-builder">
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
}

export default App;
