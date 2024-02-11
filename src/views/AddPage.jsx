import Form from "../components/Form";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Add () {

  const navigate = useNavigate()
  const url = 'https://phase2-aio.vercel.app'

  async function handleSubmit(event, name, description, price, imgUrl, stock, categoryId) {
      event.preventDefault()
      try {
          const added = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }

          const { data } = await axios.post(`${url}/apis/restaurant-app/cuisines`, added, {
              headers: {
                  Authorization: `Bearer ${localStorage.access_token}`
              }
          })
        //   console.log(data);
        Swal.fire({
            title: 'Success Add New Cuisine',
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          navigate('/')
      } catch (error) {
        console.log(error);
          Swal.fire({
              title: error.response.data.error,
              icon: "error"
          });
      }
  }

    return (
      <>
      <Form handleSubmit={handleSubmit} titleName={'Add Cuisine'} />
  </>
    )
}