import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, Grid } from '@mui/material';

function DailyIncomePage() {
  const [dailyIncomes, setDailyIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchDailyIncomes() {
      try {
        const res = await fetch('/api/admin/dailyincomes');
        const data = await res.json();
        setDailyIncomes(data.data);
      } catch (error) {
        console.error('An error occurred while fetching the daily incomes', error);
      }
    }

    fetchDailyIncomes();
  }, []);

  const handleOpen = income => {
    setSelectedIncome(income);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    setSelectedIncome({
      ...selectedIncome,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/admin/dailyincomes/${selectedIncome._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedIncome)
      });

      if (res.status === 200) {
        console.log('Daily income updated successfully');
        setDailyIncomes(dailyIncomes.map(income => (income._id === selectedIncome._id ? selectedIncome : income)));
      } else {
        console.error('Error updating daily income');
      }
    } catch (error) {
      console.error('An error occurred while updating the daily income', error);
    }

    // Close the modal
    handleClose();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Invest Package</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyIncomes.map(income => (
              <TableRow key={income._id}>
                <TableCell>{income.userName}</TableCell>
                <TableCell>{income.productId}</TableCell>
                <TableCell>{income.investPackage}</TableCell>
                <TableCell>{income.amount}</TableCell>
                <TableCell>{new Date(income.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                <TableCell>{income.paymentStatus}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' onClick={() => handleOpen(income)}>
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
          <h2>Edit Daily Income</h2>
          {selectedIncome && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Username'
                  value={selectedIncome.userName}
                  onChange={e => handleInputChange(e, 'userName')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Product ID'
                  value={selectedIncome.productId}
                  onChange={e => handleInputChange(e, 'productId')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Invest Package'
                  value={selectedIncome.investPackage}
                  onChange={e => handleInputChange(e, 'investPackage')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Amount'
                  value={selectedIncome.amount}
                  onChange={e => handleInputChange(e, 'amount')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Date'
                  value={selectedIncome.date}
                  onChange={e => handleInputChange(e, 'date')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Payment Status'
                  value={selectedIncome.paymentStatus}
                  onChange={e => handleInputChange(e, 'paymentStatus')}
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
  );
}

export default DailyIncomePage;
