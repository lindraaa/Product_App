import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductScore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
const Homepage = () => {
  const { fetchProducts, products } = useProductScore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            // Screen sizing responsive
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"grey.100"}
          >
            No Products Found... {"  "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="grey"
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;
