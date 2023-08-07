import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Orden from '../models/Order'


const Index = ({ ordenes }) => (

  <>
    {/* 
    createDate: Date,
    status: String,
    client: String,
    shippingAddress: String,
    shippingPromise: Date,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    */}
    {ordenes?.map((orden) => (
      <div key={orden._id} className="card">
        <h5 className="orden-id">ID de la orden: {orden._id}</h5>
        <p className="orden-creation-date">Fecha de creación: {orden.createDate}</p>
        <p className="owner">Cliente: {orden.client}</p>
        <p className="status">Estado: {orden.status}</p>
        <p className="shipping-address">Dirección de envío: {orden.shippingAddress}</p>
        <p className="delivery-date">Fecha de entrega prometida: {orden.shippingPromise}</p>
        <div className="btn-container">
          <Link href="/[id]/edit" as={`/${orden._id}/edit`} legacyBehavior>
            <button className="btn edit">Editar</button>
          </Link>
          <Link href="/[id]" as={`/${orden._id}`} legacyBehavior>
            <button className="btn view">Detalles</button>
          </Link>
        </div>
      </div>
    ))}

  </>
)


export async function getServerSideProps() {
  await dbConnect();

  // Calcular la fecha límite para la promesa de entrega
  const shippingDeadline = new Date();
  shippingDeadline.setDate(shippingDeadline.getDate() + 2);

  // Buscar todas las órdenes en estado "Approve" y con fecha de promesa de entrega antes de la fecha límite
  const result = await Orden.find({
    status: 'Approve',
    shippingPromise: { $lt: shippingDeadline },
  }).populate('items');

  const ordenes = result?.map((doc) => {
    const orden = doc.toObject();
    orden._id = orden._id.toString();
    orden.createDate = orden.createDate.toString();
    orden.shippingPromise = orden.shippingPromise.toString();
    orden.items = orden.items.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
      description: item.description,
      url: item.url,
      price: item.price,
    })); // Convertir cada item en un objeto serializable
    return orden;
  });

  return { props: { ordenes: ordenes ?? null } };
}


export default Index
