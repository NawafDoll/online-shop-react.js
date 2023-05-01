import {
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
interface productData {
  _id: string;
  name: string;
  image: string;
  price: number;
  discription: string;
  category: string;
}

function ProductInf() {
  const { _id } = useParams();
  const [product, setAllProducts] = useState<productData>({
    _id: "",
    name: "",
    image: "",
    price: 0,
    discription: "",
    category: "",
  });
  const productFun = useCallback(() => {
    return axios
      .get(`http://localhost:3322/product/${_id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  useEffect(() => {
    productFun();
  }, [productFun]);
  return (
    <Flex justifyContent={"space-around"} flexWrap={"wrap"} m={"7"}>
      <Card
        h={"480px"}
        m={"7"}
        key={product._id}
        boxShadow={"dark-lg"}
        backgroundColor={"#FFFF"}
      >
        <Image
          src={product.image}
          borderRadius="lg"
          width={"270px"}
          height={"340px"}
        />
        <Stack spacing="2" py={"1"} p={"1"}>
          <Flex textAlign={"center"} flexDirection={"column"}>
            <Heading size="md">{product.name}</Heading>

            <Text>{product.discription}</Text>
          </Flex>
        </Stack>
        <Divider />
        <Text color="blue.600" fontSize="2xl" textAlign={"center"}>
          price: {product.price}$
        </Text>
        {/*<CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Add to cart
            </Button>
            <NumberInput defaultValue={0} w={"100px"} max={10} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
      <Box
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in"
        // data-aos-mirror="false"
        data-aos-once="true"
        data-aos-anchor-placement="top-bottom"
        backgroundColor={"blackAlpha.800"}
        border={"2px"}
        width={"400px"}
        boxShadow="dark-lg"
        p="10"
        rounded="3xl"
      >
        <Heading fontSize={"40px"} color={"white"} textAlign={"center"}>
          {product.name}
        </Heading>
        <Text fontSize={"3xl"} textColor={"blue.100"}>
          it is a British brand of sportswear and ready-to-wear fashion, founded
          in 1952. It is known for its unique collar polo shirts, which are
          considered a staple in men's fashion.
        </Text>
      </Box>
    </Flex>
  );
}

export default ProductInf;
