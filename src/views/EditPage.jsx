import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../components/Form";

export default function edit() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "https://phase2-aio.vercel.app";

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`);
      //   console.log(data.data);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleSubmit(event, name, description, price, imgUrl, stock, categoryId) {
    event.preventDefault();
    try {
      const edited = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };

      await axios.put(`${url}/apis/restaurant-app/cuisines/${id}`, edited, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Success Edited",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  return (
    <>
      <Form handleSubmit={handleSubmit} product={product} titleName={'Edit Page'}/>
    </>
  );
}
