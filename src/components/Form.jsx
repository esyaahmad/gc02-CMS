import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom'


export default function ProductsForm({ handleSubmit, product, titleName}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const url = "https://phase2-aio.vercel.app";

  // console.log(product);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImgUrl(product.imgUrl);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/restaurant-app/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
        console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchCategories()
}, [])

  return (
    <>

      <div className="relative flex flex-col justify-center h-screen overflow-hidden m-2 p-2">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">{titleName}</h1>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input type="text" placeholder="Enter Name" className="w-full input input-bordered" onChange={(e) => setName(e.target.value)} value={name || ''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Description</span>
              </label>
              <input type="text" placeholder=" Enter Description" className="w-full input input-bordered" onChange={(e) => setDescription(e.target.value)} value={description || ''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Price</span>
              </label>
              <input type="number" placeholder="Enter Price" className="w-full input input-bordered" onChange={(e) => setPrice(e.target.value)} value={price || 0} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Stock</span>
              </label>
              <input type="number" placeholder="Enter Stock" className="w-full input input-bordered" onChange={(e) => setStock(e.target.value)} value={stock ||0} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Image (URL)</span>
              </label>
              <input type="text" placeholder="Enter Image URL" className="w-full input input-bordered" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl||''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Category</span>
              </label>
              <select className="w-full input input-bordered input-primary" onChange={(e) => setCategoryId(e.target.value)} name="category" id="" value={categoryId}>
                <option value="">Choose</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div>
              <button className="btn btn-block" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <form className=" grid grid-cols-2 gap-4 mt-4" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Name</span>
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="w-full input input-bordered input-primary"
                    value={name}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Description</span>
                </label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Enter Description"
                    className="w-full input input-bordered input-primary"
                    value={description}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Price</span>
                </label>
                <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Enter Price"
                    className="w-full input input-bordered input-primary"
                    value={price}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Stock</span>
                </label>
                <input
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    placeholder="Enter Stock"
                    className="w-full input input-bordered input-primary"
                    value={stock}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Image (URL)</span>
                </label>
                <input
                    onChange={(e) => setImgUrl(e.target.value)}
                    type="text"
                    placeholder="Image URL"
                    className="w-full input input-bordered input-primary"
                    value={imgUrl}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Category</span>
                </label>
                <select
                    className="w-full input input-bordered input-primary"
                    onChange={(e) => setCategoryId(e.target.value)}
                    name="category"
                    id=""
                >
                    {categories.map(c => {
                        return <option key={c.id} value={c.id}>{c.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button type="submit" className="w-full btn btn-accent">{nameProp}</button>
            </div>
        </form> */}
    </>
  );
}
