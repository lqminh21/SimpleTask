
    const processUpload = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
    
            fileReader.onload = () => {
                let base64 = fileReader.result
                const {name, size, type} = file
                resolve({name, size, type, base64})
            }
    
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
export default processUpload