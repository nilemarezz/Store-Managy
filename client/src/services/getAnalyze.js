const getAnalyze = async () => {
  const res = await fetch('http://localhost:5000/summary/data');
  const data = await res.json()
  if (data.result) {
    return data.data
  } else {
    return false
  }
}
export default getAnalyze