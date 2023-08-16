import dbConnect from 'src/server/utils/dbConnect';
import DailyIncome from 'src/server/models/dailyIncome.model';

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const dailyIncomes = await DailyIncome.find({});
        res.status(200).json({ success: true, data: dailyIncomes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const dailyIncome = await DailyIncome.create(req.body);
        res.status(201).json({ success: true, data: dailyIncome });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
