/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import CardLength from "../component/CardLength";
interface data {
  image: string;
  name: string;
  price: number;
  timestamp: number;
  amount: number;
  _id: string;
}
function Cards() {
  const [allCard, setAllCard] = useState<data[]>([
    { _id: "", name: "", image: "", price: 0, timestamp: 0, amount: 0 },
  ]);
  const [total, setTotal] = useState();
  const toast = useToast();
  useEffect(() => {
    axios
      .get("https://online-shop-mbej-p9jt.onrender.com/card/all", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAllCard(res.data.allCards);
      });
  }, []);

  const totalPrice = () => {
    axios
      .get("https://online-shop-mbej-p9jt.onrender.com/card/total", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotal(res.data);
      });
  };
  useEffect(() => {
    totalPrice();
  }, [total]);
  totalPrice();
  const deleteCard = (id: any) => {
    axios.delete(
      `https://online-shop-mbej-p9jt.onrender.com/card/delete/${id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setAllCard(allCard.filter((e: any) => e._id !== id));
    CardLength();
    totalPrice();
  };

  const buy = () => {
    try {
      axios
        .post(
          `https://online-shop-mbej-p9jt.onrender.com/order`,
          { total: total },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toast({
            colorScheme: "pink",
            position: "top",
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            colorScheme: "pink",
            position: "top",
            title: err.response.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
    } catch (Error: any) {
      console.log(Error.response);
      toast({
        colorScheme: "pink",
        position: "top",
        title: Error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH={"75.6vh"}>
      <VStack justifyContent={"center"}>
        {allCard.map((product) => {
          return (
            <Box key={product._id} width={"50%"}>
              <HStack mt={"10"} justify={"space-between"}>
                <Text width={"15"} fontSize={"80%"} fontWeight={"bold"}>
                  Product
                </Text>
                <Text width={"15"} fontSize={"80%"} fontWeight={"bold"}>
                  Name
                </Text>
                <Text width={"15"} fontSize={"80%"} fontWeight={"bold"}>
                  price
                </Text>
                <Text width={"15"} fontSize={"80%"} fontWeight={"bold"}>
                  Amount
                </Text>
                <Text width={"15"} fontSize={"80%"} fontWeight={"bold"}>
                  Remove
                </Text>
              </HStack>
              <Divider width={"100%"} />
              <HStack mt={"5"} justify={"space-between"}>
                <Image w={"10"} src={product.image} />
                <Text overflowWrap={"normal"} w={"9"} h={"9"} lineHeight={"4"}>
                  {product.name}
                </Text>
                <Text color={"blue"} width={"10"}>
                  {product.price}$
                </Text>
                <Text width={"10"}>{product.amount}</Text>
                <DeleteIcon
                  color={"red"}
                  cursor={"pointer"}
                  onClick={() => {
                    deleteCard(product._id);
                  }}
                ></DeleteIcon>
              </HStack>
              <Divider />
            </Box>
          );
        })}
      </VStack>
      <VStack
        bg={"gray.200"}
        width={"145px"}
        height={"140px"}
        position={"relative"}
        bottom={0}
        left={"60%"}
        mt={"6"}
      >
        <Heading>TOTAL</Heading>
        <Divider />
        <HStack>
          <Text fontSize={"2xl"}>Price: </Text>
          <Text fontWeight={"bold"} fontSize={"2xl"} color={"blue"}>
            {total}$
          </Text>
        </HStack>
        <Button
          className="buy"
          width={"100%"}
          colorScheme={"blue"}
          onClick={buy}
          borderRadius={"none"}
        >
          Buy
        </Button>
      </VStack>
    </Box>
  );
}

export default Cards;

// <Card
//               h={"510px"}
//               m={"7"}
//               // border={"1px"}
//               key={product._id}
//               boxShadow={"dark-lg"}
//               backgroundColor={"#FFFF"}
//             >
//               <Image
//                 src={product.image}
//                 borderRadius="md"
//                 width={"260px"}
//                 height={"300"}
//               />
//               <Stack spacing="2" py={"1"} p={"1"}>
//                 <Flex
//                   textAlign={"center"}
//                   flexDirection={"column"}
//                   alignItems={"center"}
//                 >
//                   <div className="productName">
//                     <h2>
//                       {product.name}
//                       <span></span>
//                     </h2>
//                   </div>
//                 </Flex>
//                 <Text color="blue.600" fontSize="2xl">
//                   price: {product.price}$
//                 </Text>
//                 <Text>amount:{product.amount}</Text>
//               </Stack>
//               <Divider />

//               <CardFooter margin={"0"} alignSelf={"center"} height={"50"}>
//                 <ButtonGroup spacing="81">
//                   <Button variant="solid" colorScheme="blue">
//                     Buy
//                   </Button>
//                   <Button
//                     variant="solid"
//                     colorScheme="red"
//                     onClick={() => deleteCard(product._id)}
//                   >
//                     Delete
//                   </Button>
//                 </ButtonGroup>
//               </CardFooter>
//             </Card>
