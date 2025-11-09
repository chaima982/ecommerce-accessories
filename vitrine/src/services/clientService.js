import http from './axiosContext'


const create = (data) => {
    return http.post("/users",data)

}
const logout = () => {
    return http.delete("/users/logout")
}

/*  const login = (data) => {
    return http.post("/api/login",data)

} */
 const register = (data) => {
    return http.post("/api/register",data)
} 

/* const logout = (id,data) => {
    return http.delete(`/api/users/${id}`,data) 
} */ 


const getall = () => {
    return http.get('/users/getall')
}

const updateUser = (id,data) =>{
    return http.put(`/users/updateUser/${id}`,data)
}



export default {getall,logout,updateUser,register,create}
