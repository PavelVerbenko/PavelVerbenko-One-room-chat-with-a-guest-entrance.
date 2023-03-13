export function blobTobase64(blob) {
 return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
        res(reader.result)
    }
    reader.onerror = rej
 })
}

export function base64ToBlob(base64) {
    return new Promise((res) => {
        fetch(base64)
            .then(res => res.blob())
            .then(data => res(data))
     })
}