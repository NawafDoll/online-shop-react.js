import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
interface data {
  name: string;
  image: string;
  price: number;
  category: string;
  discription: string;
}
function AddProduct() {
  const [product, setProduct] = useState<data>({
    name: "",
    image: "",
    price: 0,
    category: "",
    discription: "",
  });

  const AddProduct = () => {
    axios.post(
      "https://online-shop-mbej-p9jt.onrender.com/product/create",
      {
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        discription: product.discription,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };
  return (
    <VStack minH={"75.6vh"} justify={"space-between"}>
      <Box>
        <Text w={"fit-content"}>name</Text>
        <Input
          type={"text"}
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </Box>
      <Box>
        <Text w={"fit-content"}>image</Text>
        <Input
          type={"text"}
          name="image"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
      </Box>
      <Box>
        <Text w={"fit-content"}>price</Text>
        <Input
          type={"number"}
          name="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
        />
      </Box>
      <Box>
        <Text>category</Text>
        <Input
          type={"text"}
          name="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
      </Box>
      <Box>
        <Text>discription</Text>
        <Input
          type={"text"}
          name="discription"
          value={product.discription}
          onChange={(e) =>
            setProduct({ ...product, discription: e.target.value })
          }
        />
      </Box>
      <Button onClick={AddProduct}>Submit</Button>
    </VStack>
  );
}

export default AddProduct;
