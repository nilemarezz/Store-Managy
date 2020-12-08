const getList = async () => {
  const res = await fetch('https://nodemanagy.herokuapp.com/list/12_20');
  const data = await res.json()
  console.log(data)
  return data.data
}

export default getList