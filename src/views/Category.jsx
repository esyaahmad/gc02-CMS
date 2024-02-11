import axios from 'axios';
import { useEffect, useState } from "react";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const url = 'https://phase2-aio.vercel.app'

    async function fetchData (){
        try {
            // setLoading(true)
            const { data } = await axios.get(`${url}/apis/restaurant-app/categories`, {headers: {Authorization: `Bearer ${localStorage.access_token}`}});
            setCategories(data.data);
            // console.log(data.data);
            
        } catch (error) {
            console.log(error);
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


  return (
    <>
    <br />
    <div className="relative overflow-x-auto">
      <table className="w-6/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
            {categories.map((category, i)=> {
                return(
          <tr key={category.id }className="bg-white w-fit dark:bg-gray-800">
            <td scope="row" className="px-6 py-4 w-fit font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {i+1}
            </td>
            <td className="px-6 py-4 w-fit">{category.name}</td>
            <td className="px-6 py-4 w-fit">{formatDate(category.createdAt)}</td>

          </tr>
                )
            })}
          
        </tbody>
      </table>
    </div>
    </>

  );
}
