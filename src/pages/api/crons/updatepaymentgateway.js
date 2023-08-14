import PaymentGatewayInfo from 'src/server/models/paymentGatewayInfo.model';

// Example: Create a new entry
const newGatewayInfo = new PaymentGatewayInfo({
    sample_partner_id: 'examplePartnerID',
    api_key: 'll7s4cwt1f47bf7878dn4pad',
    endpoint_url: 'https://secure.sharkpe.in/api/v1/orderStatus'
});

newGatewayInfo.save()
    .then(() => console.log('Saved successfully!'))
    .catch(error => console.error('Error saving:', error));
