import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { useProductScore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedproduct, setupdatedproduct] = useState(product)

  const textcolor = useColorModeValue("gray.600", "gray.200");
  const { deleteProduct, updateProduct} = useProductScore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handledeleteproduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toast({
        title: "Error",
        status: "error",
        description: message,
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        status: "success",
        description: message,
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleupdateproduct = async (productId, updatedproduct )  => {
    const {success, message} = await updateProduct(productId, updatedproduct)
    if (!success) {
        toast({
          title: "Error",
          status: "error",
          description: message,
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          status: "success",
          description: message,
          duration: 2000,
          isClosable: true,
        });
      }
    onClose();
  };
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textcolor} mb={4}>
          ₱{product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />

          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handledeleteproduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Edit Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Input fields for name, price, and image */}
            <FormControl mb={4}>
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={updatedproduct.name}
                onChange={(e)=>setupdatedproduct({...updatedproduct,name:e.target.value})}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Input
                id="price"
                type="number"
                name="price"
                value={updatedproduct.price}
                onChange={(e)=>setupdatedproduct({...updatedproduct,price:e.target.value})}

              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="image">Image URL</FormLabel>
              <Input
                id="image"
                name="image"
                value={updatedproduct.image}
                onChange={(e)=>setupdatedproduct({...updatedproduct,image:e.target.value})}

              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleupdateproduct(product._id, updatedproduct)}>Update</Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
