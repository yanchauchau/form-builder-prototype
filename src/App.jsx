import { useState, useEffect } from "react";
import "./App.css";
import BuildForm from "./components/HookForm";
import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useColorMode, ColorModeButton } from "@/components/ui/color-mode";

function App() {
  const [preview, setPreview] = useState([]); // Initialize with an empty array
  const { toggleColorMode } = useColorMode();
  useEffect(() => {
    // Add a log to verify when the preview is updated
    console.log("Updated preview:", preview);
  }, [preview]);

  return (
    <>
      <Box
        id="header"
        display="flex"
        p="l"
   
        w="100%"
        flexDir="row"
      >
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
          <Text fontSize="xs">Last updated on 2 Apr 2025</Text>
        </Box>
        <ColorModeButton />
      </Box>
      <Box w="100%" spaceY="2">
        <BuildForm />
      </Box>

      {/* <Box w="100%" display="flex" direction="column">
        <Box w="100%" p="m" spaceY="2">
          <h3>Section heading</h3>
          <BuildForm />
        </Box>

        <Box w="100%" p="m" spaceY="2" background="blue.50" id="preview">
          <h2>Preview</h2>
          <Box>
            {preview.length > 0 ? preview.map((item, index) => <div key={index}>{item}</div>) : <p>No preview available</p>}
          </Box>
        </Box>
      </Box> */}
    </>
  );
}

export default App;
