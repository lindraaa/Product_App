import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { MdOutlineLightMode,MdNightlight  } from "react-icons/md";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={"4"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
          base: "column",
          sm: "row ",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, gray.600, gray.300)"}
          bgClip={"text"}
        >
          <Link to={"/"} textColor={useColorModeValue("grey","white")}>Product Store 🛒 </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MdOutlineLightMode /> :<MdNightlight />
            }
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
