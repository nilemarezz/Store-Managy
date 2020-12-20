const addList = async (value) => {
  const res = await fetch(`http://localhost:5000/add?admin=${process.env.REACT_APP_ADMIN_SHEET_JP}&user=${process.env.REACT_APP_USER_SHEET_JP}`, {
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