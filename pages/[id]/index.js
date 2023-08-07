import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Order from '../../models/Order'

/* Allows you to view pet card info and delete pet card*/
const OrdenPage = ({ orden }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleDelete = async () => {
    const orderID = router.query.id

    try {
      await fetch(`/api/ordenes/${orderID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the order.')
    }
  }

  return (
    <div key={orden._id} className="card-detail">
      <h5 className="orden-id">ID de la orden: {orden._id}</h5>
      <p className="orden-creation-date">Fecha de creación: {orden.createDate}</p>
      <p className="owner">Cliente: {orden.client}</p>
      <p className="status">Estado: {orden.status}</p>
      <div className="items info">
        <p className="label">Items:</p>
        <ul>
          {orden.items.map((item) => (
            <li key={item._id}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <p className="shipping-address">Dirección de envío: {orden.shippingAddress}</p>
      <p className="delivery-date">Fecha de entrega prometida: {orden.shippingPromise}</p>
      <div className="btn-container">
        <Link href="/[id]/edit" as={`/${orden._id}/edit`} legacyBehavior>
          <button className="btn edit">Editar</button>
        </Link>
        <button className="btn delete" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const orden = await Order.findById(params.id).populate('items').lean()
  orden._id = orden._id.toString()
  orden.createDate = orden.createDate.toString()
  orden.shippingPromise = orden.shippingPromise.toString()
  console.log('orden.itemsS :>> ', orden.items);
  orden.items = orden.items.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    url: item.url,
    price: item.price,
  })); // Convertir cada item en un objeto serializable

  return { props: { orden } }
}

export default OrdenPage
