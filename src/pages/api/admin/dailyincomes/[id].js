import dbConnect from 'src/server/utils/dbConnect';
import DailyIncome from 'src/server/models/dailyIncome.model';

export default async (req, res) => {
  await dbConnect();

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const dailyIncome = await DailyIncome.findById(id);
        if (!dailyIncome) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: dailyIncome });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const dailyIncome = await DailyIncome.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!dailyIncome) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: dailyIncome });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedDailyIncome = await DailyIncome.deleteOne({ _id: id });
        if (!deletedDailyIncome) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
