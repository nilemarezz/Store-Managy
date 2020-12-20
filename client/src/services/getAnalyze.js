const getAnalyze = async () => {
  const res = await fetch(`http://localhost:5000/summary/data?admin=${process.env.REACT_APP_ADMIN_SHEET_JP}`);
  const data = await res.json()
  if (data.result) {
    return data.data
  } else {
    return false
  }
}
export default getAnalyze