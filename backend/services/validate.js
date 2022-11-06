export const validate = {
    phone(data){
        return data && data.length === 10 && !isNaN(data) && !data.includes(' ')
    }
}