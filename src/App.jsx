import { useState } from "react";
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';  // Ensure correct import
import "./App.css";
import BuildForm from "./components/HookForm";
import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

function App() {
  const [count, setCount] = useState(0);
  const [preview, setPreview] = useState(null);
  const data = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    title: "Test heading",
    formattedPrice: "$435",
    reviewCount: 34,
    rating: 4.5,
  };

  return (
    <>
      <Box id="header" p="l" borderWidth="1px">
        <HStack>
          <Heading
            as="h1"
            size="lg"
            bg="linear-gradient(to left,rgb(123, 228, 31),rgb(2, 65, 137))"
            bgClip="text"
          >
         Form builder
          </Heading>
        </HStack>
      </Box>

      <Box w="100%" display="flex" direction="column">
        <Box w="100%" p="m" spaceY="2" >
          <h3>Section heading</h3>

          <Button>Button</Button>
          <BuildForm setPreview={setPreview} />
        </Box>

        <Box w="100%" p="m" spaceY="2" background="blue.50" id="preview" >
          <VStack w="100%">
            <Stack p={4} borderWidth="2px" mt={4}>
              <strong>Preview:</strong>
              {preview}
            </Stack>
          </VStack>
        </Box>
      </Box>

      <Box id="tester" bg="blue.900" display="flex" m="xl">
        <Box w="100%" p="4" spaceY="2" background="gray.800">
          <HStack>
            <Badge colorPalette="teal" variant="solid">
              Superhost
            </Badge>
            <HStack gap="1" fontWeight="medium">
              <Icon color="orange.400">
                <HiStar />
              </Icon>
              <Text>
                {data.rating} ({data.reviewCount})
              </Text>
            </HStack>
          </HStack>
          <Text fontWeight="medium" color="fg" textAlign="start">
            {data.title}
          </Text>
          <HStack color="fg.muted">
            {data.formattedPrice} • {data.beds} beds
          </HStack>
        </Box>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Box>
    </>
  );
}

export default App;
