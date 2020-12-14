const getList = async (value) => {
  const res = await fetch(`http://localhost:5000/list/?sheet=${value}&admin=${process.env.REACT_APP_ADMIN_SHEET_JP}`);
  const data = await res.json()
  if (data.result === true) {
    return data.data
  } else {
    return []
  }

}

export default getList