import Link from 'next/link'
import react, { useState } from 'react';
import dbConnect from '../lib/dbConnect'
import Orden from '../models/Order'


const Index = ({ ordenes }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  return (<>
    {/* 
    createDate: Date,
    status: String,
    client: String,
    shippingAddress: String,
    shippingPromise: Date,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    */}
    <div className='report-container'>
      <Link href="/reporte" as={`/reporte`} legacyBehavior>
        <button className="lg-btn report">Reporte: 2 days left</button>
      </Link>
      <div className='report-container'>
        <input
          className='picker'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className='picker'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Link
          href={`/reporte2?startDate=${startDate}&endDate=${endDate}`}
          legacyBehavior
        >
          <button className="lg-btn report">Reporte: Traveling</button>
        </Link>
      </div>

    </div>
    {ordenes?.map((orden) => (
      <div key={orden._id} className="card">
        <h5 className="orden-id">ID de la orden: {orden._id}</h5>
        <p className="orden-creation-date">Fecha de creación: {orden.createDate}</p>
        <p className="owner">Cliente: {orden.client}</p>
        <p className="status">Estado: {orden.status}</p>
        <p className="shipping-address">Dirección de envío: {orden.shippingAddress}</p>
        <p className="delivery-date">Fecha de entrega prometida: {orden.shippingPromise}</p>
        <div className="btn-container">
          <Link href="/[id]" as={`/${orden._id}`} legacyBehavior>
            <button className="btn view">Detalles</button>
          </Link>
        </div>
      </div>
    ))}

  </>)
}


export async function getServerSideProps(context) {
  await dbConnect();

  // Obtener las fechas de inicio y fin desde los parámetros de la URL
  const { startDate, endDate } = context.query;

  // Buscar todas las órdenes en estado "Traveling" y con fecha de creación entre las fechas dadas
  const result = await Orden.find({
    status: 'Traveling',
    createDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
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
