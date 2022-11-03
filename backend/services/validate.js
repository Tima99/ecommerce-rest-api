export const validate = {
    phone(data){
        return data.length === 10 && !isNaN(data) && !data.includes(' ')
    }
}