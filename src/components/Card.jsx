export default function Card ({product}) {
        const rupiah = (number)=>{
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(number);
          }
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className="w-[700px] h-[300px]"src={product.imgUrl} alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">{rupiah(product.price)}</button>
                </div>
            </div>
            </div>


        {/* <div className="flex justify-around">
    <div className="card w-96 bg-base-100 shadow-xl justi">
    <figure><img src={product.imgUrl} alt="car!"/></figure>
    <div className="card-body">
        <h2 className="scard-title color text-centre text-xl text-teal-200">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
        </div>
    </div>
    </div>

        </div> */}
        </>
    )
}