import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState({ id: "", token: "" });

  async function checkEmail(): Promise<void> {
    try {
      const req = await axios.post(
        `http://localhost:3322/user/forgetpassword`,
        { email: email }
      );
      idAndtoken(req.data.resetPass);
      setTimeout(() => {
        navigate(`/user/forgetpassword/${links.id}/${links.token}`);
      }, 3000);
    } catch (Error: any) {
      console.log(Error);
      alert(Error.response.data.message);
    }
  }

  const idAndtoken = (reset: any) => {
    axios.get(reset).then((res) => {
      setLinks({ id: res.data.id, token: res.data.token });
    });
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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          {/* <Link to={`/user/forgetpassword/${id}/${token}`}> */}
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type={"reset"}
            onClick={checkEmail}
          >
            Request Reset
          </Button>
          {/* </Link> */}
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgetPassword;
