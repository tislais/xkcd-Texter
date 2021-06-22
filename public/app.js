//const fetch = require('node-fetch');
//import fetch from 'node-fetch';


// eslint-disable-next-line no-undef
const form = document.getElementById('create-texter');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // eslint-disable-next-line no-undef
  const data = new FormData(event.target);
  
  const res = await fetch('/api/v1/texts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.get('name'),
      zip: data.get('zip'),
    }),
  });

  const json = await res.json();
  console.log('json.id: ', json.id);
  
  
  
});
