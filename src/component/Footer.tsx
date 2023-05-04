import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import "../component/app.css";
import "./app.css";
function Footer() {
  return (
    <Box
      bg={"blackAlpha.500"}
      h={"120px"}
      display={"flex"}
      justifyContent={"Center"}
      alignItems={"flex-start"}
      fontWeight={"bold"}
      fontSize={"2xl"}
      width={"100%"}
      position="relative"
      left={0}
      bottom={0}
      right={0}
      mt={"auto"}
      textAlign={"center"}
    >
      <Box textAlign={"center"} width={"30%"} mb={"50px"}>
        <Text mb={"5px"}>Logo</Text>
        <Divider borderColor={"black"} />
      </Box>
      <ul>
        <li>
          <a>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </li>
        {/* <li>
          <a>
            <i className="fa fa-google-plus-g" aria-hidden="true"></i>
          </a>
        </li> */}
        <li>
          <a>
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a>
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </Box>
  );
}

export default React.memo(Footer);
