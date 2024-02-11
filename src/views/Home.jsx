import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'




export default function Home () {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const url = 'https://phase2-aio.vercel.app'
    // const [loading, setLoading] = useState(false)

    //fetch data
    async function fetchData (){
        try {
            // setLoading(true)
            const { data } = await axios.get(`${url}/apis/restaurant-app/cuisines`, {headers: {Authorization: `Bearer ${localStorage.access_token}`}});
            setProducts(data.data);
            // console.log(data.data);
            
        } catch (error) {
            console.log(error); 
            Swal.fire({
              title: error.response.status,
              icon: 'error',
          });
          localStorage.clear()
          navigate('/login')
        }
    }

    useEffect(() => {
        console.log('ini proses mounted, hanya dijalankan 1x di awal');
        fetchData();
    }, [])

    const formatDate = (date) => {
      // console.log(date);
      let newDate = new Date(date)
      const options = {
          weekday : 'long',
          year: 'numeric',
          month:'long',
          day: 'numeric'
      }
      return newDate.toLocaleDateString('id-ID', options)
  }

    const rupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    };

    function handleEdit(id) {
      navigate(`/edit/${id}`)
  }

  
  function handleChangeImage(id) {
    navigate(`/patch/${id}`)
}

  async function handleDelete(id) {
    try {
        await axios.delete(`${url}/apis/restaurant-app/cuisines/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })

        Swal.fire({
            title: 'Delete success',
            icon: "success"
        });

        fetchData()
    } catch (error) {
        Swal.fire({
            title: error.response.data.error,
            icon: "error"
        });
    }
}


    return (
        <>
        <div className="overflow-x-auto">
  <table className="table table-xs text-red-600 bg-yellow-400">
    <thead className='text-red-600'>
      <tr>
        <th>No</th>
        <th>Name</th> 
        <th>Description</th> 
        <th>Price</th> 
        <th>Created By</th> 
        <th>Created At</th>
        <th>Action</th>
      </tr>
    </thead> 
    <tbody>
      {products.map((cuisine, i) => {
        return(
      <tr key={cuisine.id}> 
        <th >{i+1}</th> 
        <th>
        <div className="flex items-center gap-3 ">
            <div className="avatar">
              <div className="mask mask-squircle w-20 h-32">
                <img src={cuisine.imgUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <p className="font-bold">{cuisine.name}</p>
            </div>
          </div>

        </th>
        <td >{cuisine.description}</td> 
        <td>{rupiah(cuisine.price)}</td> 
        <td>{cuisine.User.username}</td> 
        <td>{formatDate(cuisine.createdAt)}</td> 
        <td>
        <button className="btn btn-outline btn-success" onClick={() => handleEdit(cuisine.id)}>Edit</button>
        <button className="btn btn-outline btn-error m-2" onClick={() => handleDelete(cuisine.id)}>Delete</button>
        <button className="btn btn-outline btn-primary m-2" onClick={() => handleChangeImage(cuisine.id)}>Change Image</button>
        </td>
      </tr>
        )
      })}
    </tbody> 
    <tfoot>
      <tr>
      <th>No</th>
        <th>Name</th> 
        <th>Description</th> 
        <th>Price</th> 
        <th>Created By</th> 
        <th>Created At</th>
        <th>Action</th>
      </tr>
    </tfoot>
  </table>
</div>

            
        {/* <main className="grid grid-cols-2 gap-5 px-10 my-8">
            {products.map(product => {
                return <Card key={product.id} product={product} />
            })}
        </main> */}
        </>

    )
}