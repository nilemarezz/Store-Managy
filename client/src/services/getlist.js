const getList = async () => {
  const res = await fetch('http://localhost:5000/list/12_20');
  const data = await res.json()
  return data.data
}

export default getList