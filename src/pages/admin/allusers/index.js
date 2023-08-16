import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Grid
} from '@mui/material'

function Users() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/admin/allusers')
        const data = await res.json()
        setUsers(data.data)
      } catch (error) {
        console.error('An error occurred while fetching the users', error)
      }
    }

    fetchUsers()
  }, [])

  const handleOpen = user => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = (event, field) => {
    setSelectedUser({
      ...selectedUser,
      [field]: event.target.value
    })
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      })

      if (res.status === 200) {
        console.log('User updated successfully')
        setUsers(users.map(user => (user._id === selectedUser._id ? selectedUser : user)))
      } else {
        console.error('Error updating user')
      }
    } catch (error) {
      console.error('An error occurred while updating the user', error)
    }

    // Close the modal
    handleClose()
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>SponcerID</TableCell>
              <TableCell>status</TableCell>
              <TableCell>kycStatus</TableCell>
              <TableCell>TopupAmt</TableCell>
              <TableCell>WalletBalance</TableCell>
              <TableCell>DirectMember</TableCell>
              <TableCell>CurrentInvst</TableCell>
              <TableCell>TeamBusiness</TableCell>
              <TableCell>WithdrawAmt</TableCell>
              <TableCell>isBlocked</TableCell>
              <TableCell>DirectBusiness</TableCell>
              <TableCell>TotalEarning</TableCell>
              <TableCell>TotalTeam</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.sponsorId}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.kycStatus}</TableCell>
                <TableCell>{user.topupAmt}</TableCell>
                <TableCell>{user.walletBalance}</TableCell>
                <TableCell>{user.directMember}</TableCell>
                <TableCell>{user.currentInvst}</TableCell>
                <TableCell>{user.teamBusiness}</TableCell>
                <TableCell>{user.withdrawAmt}</TableCell>
                <TableCell>{user.isBlocked}</TableCell>
                <TableCell>{user.directBusiness}</TableCell>
                <TableCell>{user.totalEarning}</TableCell>
                <TableCell>{user.totalTeam}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' onClick={() => handleOpen(user)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: '16px', backgroundColor: 'white', margin: 'auto', width: '50%' }}>
          <h2>Edit User</h2>
          {selectedUser && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Username'
                  value={selectedUser.username}
                  onChange={e => handleInputChange(e, 'username')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Email'
                  value={selectedUser.email}
                  onChange={e => handleInputChange(e, 'email')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Mobile Number'
                  value={selectedUser.mobileNumber}
                  onChange={e => handleInputChange(e, 'mobileNumber')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Sponsor ID'
                  value={selectedUser.sponsorId}
                  onChange={e => handleInputChange(e, 'sponsorId')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Status'
                  value={selectedUser.status}
                  onChange={e => handleInputChange(e, 'status')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='KYC Status'
                  value={selectedUser.kycStatus}
                  onChange={e => handleInputChange(e, 'kycStatus')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Topup Amount'
                  value={selectedUser.topupAmt}
                  onChange={e => handleInputChange(e, 'topupAmt')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Current Investment'
                  value={selectedUser.currentInvst}
                  onChange={e => handleInputChange(e, 'currentInvst')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Wallet Balance'
                  value={selectedUser.walletBalance}
                  onChange={e => handleInputChange(e, 'walletBalance')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Direct Member'
                  value={selectedUser.directMember}
                  onChange={e => handleInputChange(e, 'directMember')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Team Business'
                  value={selectedUser.teamBusiness}
                  onChange={e => handleInputChange(e, 'teamBusiness')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Withdraw Amount'
                  value={selectedUser.withdrawAmt}
                  onChange={e => handleInputChange(e, 'withdrawAmt')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Is Blocked'
                  value={selectedUser.isBlocked}
                  onChange={e => handleInputChange(e, 'isBlocked')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Direct Business'
                  value={selectedUser.directBusiness}
                  onChange={e => handleInputChange(e, 'directBusiness')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Total Earning'
                  value={selectedUser.totalEarning}
                  onChange={e => handleInputChange(e, 'totalEarning')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Total Team'
                  value={selectedUser.totalTeam}
                  onChange={e => handleInputChange(e, 'totalTeam')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' color='primary' onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Users
