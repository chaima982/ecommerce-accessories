import { useState,useEffect } from 'react';
 import authService from '../services/authService'
import { useNavigate } from 'react-router-dom';
import "../styles/login.css"

function Login() {
  const [userss, setUserss] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8060/api/users/getall')
      
    .then(response => response.json())
    
    .then(data => {
      
      setUserss(data);
     
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  

  

    const [data, setdata] = useState();
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
      setdata({
        ...data,
        [e.target.name] : e.target.value
      });
      console.log(data);
    
    };
    const onSubmitHandler = (e) =>{
      e.preventDefault()
      const userWithEmail = userss.find(user => user.Email === data.Email);
      if (data && userss[0].Email===data.Email)
      {window.location.href = "http://localhost:3001/"}

       else if (userWithEmail) {
      authService.login(data) 
      

      .then((res)=>{
        console.log(res);
        
        localStorage.setItem("user",JSON.stringify(res.data))
       
        
      })
      .catch((err)=>{
        console.log(err)
      })
      console.log(userss[0] )
      console.log(data)
      navigate("/")
    }
  
     else{navigate("/register")}
    
    };
  
    return(
       <>
<div className="container-scroller">
  <div className="container-fluid page-body-wrapper full-page-wrapper">
    <div className="content-wrapper d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto ola">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            
            <h4>Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3"  onSubmit={ onSubmitHandler} >
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" name="Email" id="exampleInputEmail1" placeholder="Email" onChange={onChangeHandler} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg"  name="MDP" id="exampleInputPassword1" placeholder="Password" onChange={onChangeHandler} />
              </div>
              <div className="mt-3">
              <button type="submit" className="btnn mr-2">SIGN IN</button>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
             
              
              </div>
             
              <div className="text-center mt-4 font-weight-light">
                Don't have an account? <a href="/register" className="text-primaryy">Create</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* content-wrapper ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>
       </>
    );
}

export default Login