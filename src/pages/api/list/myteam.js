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

                    let allTeamMembers = [];
                    await getTeamMembers(username, allTeamMembers, 1); // Starting with level 1

                    if (!allTeamMembers || allTeamMembers.length === 0) {
                        return res.status(404).json({ message: 'No team members found for this user' });
                    }

                    res.status(200).json({ teamMembers: allTeamMembers });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching team members' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};

async function getTeamMembers(username, allTeamMembers, level) {
    const teamMembers = await User.find({ sponsorId: username }, '-password -mobileNumber -email -withdrawAmt').lean(); // Excluding multiple fields
    for (let member of teamMembers) {
        member.level = level; // Assigning the current level to the member
        allTeamMembers.push(member);
        await getTeamMembers(member.username, allTeamMembers, level + 1); // Incrementing the level for the next recursive call
    }
}
