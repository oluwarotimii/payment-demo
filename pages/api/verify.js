//verufy.js

export default async function handler (req, res) {
  const {reference} = req.query;
  const secret_key = process.env.PAYSTACK_SECRET_KEY;

  //verifying useing get request

  const response = await fetch (`https://api.paystack.co/transaction/verify/${reference}`,{
    headers:{
      'Authorization': 'Bearer ${secret_key}',
    } 
  });

  const data = await response.json(); 
  if(data.status === 'sucesss') {
    res.status(200).json({ success: true, data: data.data });
  } else {
    re.status(500).json({ error: 'Transaction verification failed'});
  }
}