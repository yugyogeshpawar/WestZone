import dbConnect from 'src/server/utils/dbConnect';
import User from 'src/server/models/user.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;

                    if (!username) {
                        return res.status(400).json({ message: 'Username is required' });
                    }

                    let allInactiveMembers = [];
                    await getTeamMembers(username, allInactiveMembers, 1); // Starting with level 1

                    if (!allInactiveMembers || allInactiveMembers.length === 0) {
                        return res.status(200).json({ message: 'No inactive members found for this user', inactiveMembers: [] });
                    }

                    res.status(200).json({ inactiveMembers: allInactiveMembers });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching inactive members' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};


async function getTeamMembers(username, allTeamMembers, level) {
    const teamMembers = await User.find({
        sponsorId: username,
        topupAmt: { $eq: 0 },  // Check if topupAmt is 0
        wallet: { $eq: 0 }    // Check if wallet is 0
    }, '-password -mobileNumber -email -withdrawAmt').lean(); // Excluding multiple fields

    for (let member of teamMembers) {
        member.level = level; // Assigning the current level to the member
        allTeamMembers.push(member);
        await getTeamMembers(member.username, allTeamMembers, level + 1); // Incrementing the level for the next recursive call
    }
}
