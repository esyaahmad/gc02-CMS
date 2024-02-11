import { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'https://phase2-aio.vercel.app'
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();
        try {
            let {data} = await axios.post(`${url}/apis/login`, {email, password});
            localStorage.setItem('access_token', data.data.access_token)
            navigate('/') //cek akses tokenya sudah ada belum
            Swal.fire({
              title: 'Logged In',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
          });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    function emailOnChange(event) {
      setEmail(event.target.value)
    }

    function passwordOnChange(event) {
      setPassword(event.target.value);
  }

  console.log();
  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-gradient-to-r from-red-600 to-yellow-500">
        <div className="w-full p-6 m-auto bg-yellow-400 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-red-600">Mekidi</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="label">
                <span className="text-base label-text text-red-600">Email</span>
              </label>
              <input type="text" placeholder="Email Address" className="w-full input input-bordered" onChange={emailOnChange} value={email} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text text-red-600">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered" onChange={passwordOnChange} value={password} />
            </div>
            <br />
            <div>
              <button className="btn btn-block text-yellow-400" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
