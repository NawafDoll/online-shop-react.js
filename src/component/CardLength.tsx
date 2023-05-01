import axios from "axios";

async function CardLength() {
  const requist = await axios.get("http://localhost:3322/card/all", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return localStorage.setItem("length", JSON.stringify(requist.data.length));
}

export default CardLength;
