const getList = async (value) => {
  const res = await fetch(`https://nodemanagy.herokuapp.com/list/${value}`);
  const data = await res.json()
  if (data.result === true) {
    return data.data
  } else {
    return []
  }

}

export default getList