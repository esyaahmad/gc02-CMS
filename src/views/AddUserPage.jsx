import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const url = "https://phase2-aio.vercel.app";

  async function handleAddUser(event) {
    event.preventDefault();
    try {
      const addedUser = { username, email, password, phoneNumber, address };
      const { data } = await axios.post(`${url}/apis/add-user`, addedUser, { headers: { Authorization: `Bearer ${localStorage.access_token}` } });

      // console.log(data);
      Swal.fire({
        title: 'Success Add New User',
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }


  return (
    <>
      <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">Add New User</h1>

          <form className="space-y-4" onSubmit={handleAddUser}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input type="text" placeholder="Enter Email" className="w-full input input-bordered input-accent" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered input-accent" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">username</span>
              </label>
              <input type="username" placeholder="Enter username" className="w-full input input-bordered input-accent" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Phone Number</span>
              </label>
              <input type="text" placeholder="Enter Phone Number" className="w-full input input-bordered input-accent" onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Address</span>
              </label>
              <input type="text" placeholder="Enter Address" className="w-full input input-bordered input-accent" onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="btn btn-accent ">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
