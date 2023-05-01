import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Divider,
  Flex,
  Image,
  Input,
  useToast,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CaptionCarousel from "../component/CaptionCarousel";
import CardLength from "../component/CardLength";
// import "aos/aos.css";
interface productData {
  _id: string;
  name: string;
  image: string;
  price: number;
  discription: string;
  category: string;
}
function Home() {
  const toast = useToast();
  const [val, setVal] = useState<string>("");
  const [allProducts, setAllProducts] = useState<productData[]>([
    { _id: "", name: "", image: "", price: 0, discription: "", category: "" },
  ]);
  const [amount, setMount] = useState<any>(0);
  const addCard = async (
    name: string,
    price: number,
    image: string,
    date: number,
    _id: string
  ) => {
    try {
      const requist = await axios.post(
        `http://localhost:3322/card`,
        {
          name: name,
          price: price,
          image: image,
          date: date,
          productId: _id,
          amount: amount,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast({
        colorScheme: "pink",
        position: "top",
        title: requist.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      CardLength();
    } catch (Error) {
      console.log(Error);
    }
  };
  const showProduct = useCallback(() => {
    axios
      .get(`http://localhost:3322/product?category=${val}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [val]);
  useEffect(() => {
    showProduct();
  }, [showProduct]);

  return (
    <Box>
      <CaptionCarousel />
      <Box
        // mr={"1"}
        mt={"10px"}
        width={"fit-content"}
        position={"absolute"}
        right={"40px"}
      >
        <ul>
          <li>
            <Link to={"/card"}>
              <i
                className="fa fa-cart-arrow-down"
                // style={{ fontSize: "30px" }}
              ></i>
              <span className="length">
                {!localStorage.getItem("length")
                  ? 0
                  : localStorage.getItem("length")}
              </span>
            </Link>
          </li>
        </ul>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        marginTop={"20px"}
        marginRight={"40px"}
      >
        <Select
          onChange={(e) => setVal(e.target.value)}
          w={"200px"}
          placeholder="Select"
        >
          <option value="Jeans">Jeans</option>
          <option value="Jacket">Jacket</option>
          <option value="T-shirt">T-shirt</option>
          <option value="all">All</option>
        </Select>
      </Box>

      <Flex justifyContent={"space-around"} flexWrap={"wrap"}>
        {allProducts.map((product) => {
          return (
            <Card
              h={"450px"}
              m={"7"}
              // border={"1px"}
              key={product._id}
              boxShadow={"dark-lg"}
              backgroundColor={"#FFFF"}
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              data-aos-mirror="false"
              data-aos-once="false"
              data-aos-anchor-placement="top-bottom"
            >
              <Image
                src={product.image}
                borderRadius="md"
                width={"260px"}
                height={"260"}
              />
              <Stack spacing="2" py={"1"} p={"1"}>
                <Flex
                  textAlign={"center"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Link to={`/productInf/${product._id}`}>
                    <div className="productName">
                      <h2>
                        {product.name}
                        <span></span>
                      </h2>
                    </div>
                  </Link>
                  {/* <Text fontWeight={"medium"}>{product.discription}</Text> */}
                </Flex>
                <Text color="black" fontSize="2xl">
                  price:{" "}
                  <span style={{ color: "darkblue", fontWeight: "bold" }}>
                    {product.price}$
                  </span>
                </Text>
              </Stack>
              <Divider />
              <CardFooter
                margin={"0"}
                alignSelf={"center"}
                height={"50"}
                // marginBottom={"10"}
              >
                <ButtonGroup spacing="2">
                  <Button
                    // type={"submit"}
                    variant="solid"
                    colorScheme="blue"
                    onClick={() =>
                      addCard(
                        product.name,
                        product.price,
                        product.image,
                        Date.now(),
                        product._id
                      )
                    }
                  >
                    Add to cart
                  </Button>
                  <Input
                    defaultValue={0}
                    width={"90px"}
                    max={10}
                    min={0}
                    onChange={(e) => setMount(e.target.value)}
                  ></Input>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
}

export default React.memo(Home);
