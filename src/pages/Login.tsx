import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  axios.defaults.withCredentials = true;

  const handlerLogin = async () => {
    try {
      const requist = await axios.post(
        "https://online-shop-mbej-p9jt.onrender.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(requist);
      localStorage.setItem("token", requist.data.token);
      // alert(requist.data.message);

      toast({
        colorScheme: "pink",
        position: "top",
        title: requist.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      if (requist.data.message.includes("Welcome")) {
        navigate("/");
        window.location.reload();
      }
    } catch (Error: any) {
      console.log(Error.response);
      toast({
        colorScheme: "pink",
        position: "top",
        title: Error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: false,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                name={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                name={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to={"/forgetpassword"}>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handlerLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
