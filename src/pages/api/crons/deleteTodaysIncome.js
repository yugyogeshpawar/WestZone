import dbConnect from 'src/server/utils/dbConnect'
import DailyIncome from 'src/server/models/dailyIncome.model'
import User from 'src/server/models/user.model'

export default async (req, res) => {
  await dbConnect()

  if (req.method === 'GET') {
    try {
      // Define today's start and end
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set the time to 00:00:00.000
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      // Fetch records from DailyIncome that fall within today's date range
      const todaysIncomes = await DailyIncome.aggregate([
        { $match: { date: { $gte: today, $lt: tomorrow } } },
        { $group: { _id: '$userId', count: { $sum: 1 }, doc: { $first: '$$ROOT' } } }
      ])
      console.log(todaysIncomes)

      for (let groupedIncome of todaysIncomes) {
        const income = groupedIncome.doc

        // Check if there are exactly two records for a user
        if (groupedIncome.count >= 2) {
          const user = await User.findById(income.userId)

          if (user) {
            console.log(
              `User ${income.userId} has walletBalance: ${user.walletBalance} and totalEarning: ${user.totalEarning}`
            )

            // Decrease the user's walletBalance and totalEarning
            user.walletBalance -= income.amount
            user.totalEarning -= income.amount

            await user.save()

            // Delete the record from DailyIncome
            await DailyIncome.findByIdAndRemove(income._id)
          }
          continue
        }
      }

      res.status(200).json({ message: `Processed and deleted ${todaysIncomes.length} records for today` })
    } catch (error) {
      console.error("Error processing and deleting today's records:", error)
      res.status(500).json({ error: "Error processing and deleting today's records" })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
