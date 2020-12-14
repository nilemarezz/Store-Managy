const getList = async (value) => {
  const res = await fetch(`https://nodemanagy.herokuapp.com/list/?sheet=${value}&admin=${process.env.REACT_APP_ADMIN_SHEET_CN}`);
  const data = await res.json()
  if (data.result === true) {
    return data.data
  } else {
    return []
  }

}

export default getList