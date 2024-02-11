import {createBrowserRouter, redirect} from 'react-router-dom'
import Parent from '../views/Parent'
import Login from '../views/Login'
import Home from '../views/Home'
import Swal from 'sweetalert2'
import Category from '../views/Category'
import Add from '../views/AddPage'
import Edit from '../views/EditPage'
import AddUserPage from '../views/AddUserPage'
import ChangeImage from '../views/ChangeImage'



const router = createBrowserRouter([
{
    path: "/login",
    element: <Login />,
    loader: () => {
        if (localStorage.access_token) {
            Swal.fire({
                title: 'Ngapain cuk?????',
                icon: 'question'
            });
            return redirect('/')
        }

        return null
    }
},
{
    element: <Parent />,
    loader: () => {
        // console.log(localStorage.access_token);
        if (!localStorage.access_token) {
            Swal.fire({
                title: 'Please Login First',
                icon: 'warning'
            });
            return redirect('/login')
        }

        return null
    },
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/category",
            element: <Category />
        },
        {
            path: "/add",
            element: <Add />
        },
        {
            path: "/edit/:id",
            element: <Edit />
        },
        {
            path: "/add-user",
            element: <AddUserPage />
        },
        {
            path: "/patch/:id",
            element: <ChangeImage />
        },
    ]

}
])
export default router