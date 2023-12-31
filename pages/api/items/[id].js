import dbConnect from '../../../lib/dbConnect'
import Orden from '../../../models/Order'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const orden = await Orden.findById(id)
        if (!orden) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: orden })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const orden = await Orden.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!orden) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: orden })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deleted = await Orden.deleteOne({ _id: id })
        if (!deleted) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
