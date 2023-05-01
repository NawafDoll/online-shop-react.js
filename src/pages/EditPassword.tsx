import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPassword() {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const handlerEditPassword = () => {
    try {
      axios
        .post(`http://localhost:3322/user/forgetpassword/${id}/${token}`, {
          password: password,
        })
        .then((res) => {
          toast({
            colorScheme: "pink",
            position: "top",
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          if (res.data.message.includes("Changed Password")) {
            navigate("/login");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          New password
        </Heading>

        <FormControl>
          <Input
            placeholder="New Password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handlerEditPassword}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default EditPassword;
