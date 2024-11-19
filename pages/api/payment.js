//api/payment.js

export default async function handler(req, res) {}
if (req.method === 'POST') {
  const {email, amount} = req.body;

  const secret_key = process.env.PAYSTACK_SECRET_KEY; //paystacak secret key

  //Call the paystack API to start the transaction
  const response = await fetch ('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers:{
      'Authorization': 'Bearer ${secret_key}',  // giving authorization with the paystack secret key
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount, 
    }),
  }),
  const data = await response.json(); 
  if(data.staus == 'success') {
    //open the paystack popup with an access code
    res.status(200).json ({ access_code: data.data.access_code});
  } else {
    //if the api call fails, ,send an error response
    res.status(500).json({ error: "failed to intialize payment"})
  }  else {
    //if not a post request
    res.status(405).json({error: 'Method Not Allowed'});
  }
}