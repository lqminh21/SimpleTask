

const filterData = (objArr, prop) => {
    let newArr = []
    let newArrObj = [{key: 0, text: "All", value: "All"}]
    objArr.map( (obj, index) => {
        if(!newArr.includes(obj[prop])){
            newArr.push(obj[prop])
            newArrObj.push({key: index+1, text: obj[prop], value: obj[prop]})
          }
        })
    return newArrObj
}

export default filterData