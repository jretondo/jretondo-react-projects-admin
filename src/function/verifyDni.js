export const verifyDni = (dni) => {
    if (dni.length >= 7 && dni.length >= 8) {
        return true
    } else {
        return false
    }
}