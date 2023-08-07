import dbConnect from '../../../lib/dbConnect'
import Orden from '../../../models/Order'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const ordenes = await Orden.find({}).populate('items')
        res.status(200).json({ success: true, data: ordenes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { itemIds, ...orderData } = req.body; // Separar los IDs de los items del resto de los datos de la orden
        const order = await Order.create({ ...orderData, items: itemIds }); // Crear la orden con los IDs de los items asociados
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
