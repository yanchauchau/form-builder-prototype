import { useState } from "react";
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';  // Ensure correct import
import "./App.css";
import BuildForm from "./components/HookForm";
import {
  Badge,
  Box,
  HStack,
  Icon,
  Image,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

function App() {
  const [count, setCount] = useState(0);

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
      <Box id="header" p="l" bg="colorTest">
        <HStack  bg="colorTest">
          <h1>test</h1>
        </HStack>
      </Box>

      <Box w="100%" display="flex" direction="column">
        <Box w="100%" p="m" spaceY="2" bg="gray.50" borderWidth="1px">
         <h3>Test</h3>

         <Button>Test</Button>
          <BuildForm />
        </Box>  

        <Box w="100%" p="m" spaceY="2" background="blue.800" id="preview">
          <VStack w="100%">
      
            <h2>preview</h2>
            <Box className="question">
              <p>test</p>
            </Box>
            
            
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
