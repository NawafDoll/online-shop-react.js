import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
interface data {
  _id: string;
  total: number;
  status: string;
  date: string;
}
function PageOrder() {
  const [allOrders, setAllOrders] = useState<data[]>([
    { _id: "", total: 0, status: "", date: "" },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3322/order", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setAllOrders(res.data);
      });
  }, []);

  return (
    <Box minH={"75.6vh"}>
      <VStack justifyContent={"center"}>
        {allOrders.map((product) => {
          return (
            <Box key={product._id} width={"50%"}>
              <HStack mt={"10"} justify={"space-between"}>
                <Text fontSize={"80%"} fontWeight={"bold"}>
                  Status
                </Text>
                <Text fontSize={"80%"} fontWeight={"bold"}>
                  Date
                </Text>
                <Text fontSize={"80%"} fontWeight={"bold"}>
                  price
                </Text>
              </HStack>
              <Divider width={"100%"} />
              <HStack mt={"5"} justify={"space-between"}>
                <Text width={"fit-content"}>{product.status}</Text>
                <Text color={"blue"}>{product.date}</Text>
                <Text>{product.total}</Text>
              </HStack>
              <Divider />
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
export default PageOrder;
