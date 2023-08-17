import dbConnect from 'src/server/utils/dbConnect'
import DailyIncome from 'src/server/models/dailyIncome.model'
import User from 'src/server/models/user.model'
import cron from 'node-cron'

let isCronScheduled = false // Flag to check if cron is already scheduled

// Define the task to be run by the cron job
const updateBalancesAndEarnings = async () => {
  await dbConnect()

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  try {
    // Fetch today's records from DailyIncome
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set the time to 00:00:00.000
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const todaysIncomes = await DailyIncome.find({
      date: { $gte: today, $lt: tomorrow },
      paymentStatus: 'pending' // Only fetch records with 'pending' status
    })

    for (let income of todaysIncomes) {
      // Fetch the user corresponding to the income record
      await delay(3000)

      const user = await User.findById(income.userId)

      if (user) {
        // Update the user's walletBalance and totalEarning
        user.walletBalance += income.amount
        user.totalEarning += income.amount

        await user.save()

        // Update the paymentStatus in the DailyIncome record to 'completed'
        income.paymentStatus = 'completed'
        await income.save()
      }
    }

    console.log('Wallet balances and total earnings updated successfully')
  } catch (error) {
    console.error('Error details:', error)
  }
}

export default async (req, res) => {
  if (req.method === 'GET') {
    await updateBalancesAndEarnings() // Run the task once immediately
    if (!isCronScheduled) {
      // Schedule the cron job to run every day at 06:10
      cron.schedule('10 10 * * *', updateBalancesAndEarnings)
      isCronScheduled = true // Set the flag to true
      res.status(200).json({ message: 'Cron job is set to run every day at 06:10' })
    } else {
      res.status(200).json({ message: 'Cron job is already scheduled to run.' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
