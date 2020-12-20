const deleteList = async (value, sheet) => {
  console.log(value, sheet)
  const res = await fetch(`http://localhost:5000/delete?admin=${process.env.REACT_APP_ADMIN_SHEET_DEV}&user=${process.env.REACT_APP_USER_SHEET_DEV}&id=${value}&sheet=${sheet}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json()
  return data.result
}

export default deleteList