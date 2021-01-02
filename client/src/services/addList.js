const addList = async (value) => {
  const res = await fetch(`https://nodemanagy.herokuapp.com/add?admin=${process.env.REACT_APP_ADMIN_SHEET_KR}&user=${process.env.REACT_APP_USER_SHEET_KR}`, {
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