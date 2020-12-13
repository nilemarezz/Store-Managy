const addList = async (value) => {
  const res = await fetch(`http://localhost:5000/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
  });
  const data = await res.json()
  return data.result
}

export default addList