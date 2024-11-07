import { Container, Heading, VStack,Box, useColorModeValue, Input, Button,useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductScore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

const toast = useToast()
const {createProduct} = useProductScore()
const handleaddproduct = async()=>{
    const {success, message} = await createProduct(newProduct)
    console.log("Result",success)
    console.log("Message",message)
    
    if(!success){
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          })
    }else{
        toast({
            title: "Success",
            description: message,
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
    }
    setnewProduct({name: "",
        price: "",
        image: ""})
}
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box w={"full"} bg={useColorModeValue("white","#313639")} p={6} rounded={"lg"} shadow={"md"}>
            <VStack spacing={4}>
                <Input placeholder="Name" 
                       name="name"
                       value={newProduct.name}
                       onChange={(e)=> setnewProduct({...newProduct, name:e.target.value})}
                />
                <Input placeholder="Price" 
                       type="number"
                       name="price"
                       value={newProduct.price}
                       onChange={(e)=> setnewProduct({...newProduct, price:e.target.value})}
                />
                <Input placeholder="Image Url" 
                       name="image"
                       value={newProduct.image}
                       onChange={(e)=> setnewProduct({...newProduct, image:e.target.value})}
                />
                <Button colorScheme="blue" onClick={handleaddproduct} w={"full"}>Add Product</Button>
            </VStack> 

        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
