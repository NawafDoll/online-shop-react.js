import axios from "axios";

async function CardLength() {
  const requist = await axios.get(
    "https://online-shop-mbej-p9jt.onrender.com/card/all",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return localStorage.setItem("length", JSON.stringify(requist.data.length));
}

export default CardLength;
