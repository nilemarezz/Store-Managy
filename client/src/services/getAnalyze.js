const getAnalyze = async () => {
  const res = await fetch('https://nodemanagy.herokuapp.com/summary/data');
  const data = await res.json()
  if (data.result) {
    return data.data
  } else {
    return false
  }
}
export default getAnalyze