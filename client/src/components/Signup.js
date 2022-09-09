import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sign_img  from "./Sign_img";
import { useState } from "react";


const Signup = () => {
  const [fname , setfName] = useState('')
  const [lname , setlName] = useState('')
  const [email , setemail] = useState('')
  const [password , setpassword] =useState ('')
  const [contact , setcontact] = useState('')
  const handlesubmit = async (e)=>{
    e.preventDefault()
    const data = {
      fname : fname,
      lname : lname,
      email : email,
      password : password,
      contact : contact
    }
    const res = await fetch('http://localhost:8000/api/user/adduser' , {
      method :  'POST' , 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    // const resData = JSON.parse(res)
    console.log(res);
  }

  return (
    <>
      <div className="container">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{width:"100%"}}>
            <h3 className="text-center col-lg-6">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="First Name" name = "fName" onChange = {(e)=>setfName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Last Name" name = "lName" onChange = {(e)=>setlName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name = "email" onChange = {(e)=>setemail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name = "password" onChange = {(e)=>setpassword(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="contact" placeholder="Contact" name = "contact"  onChange = {(e)=>setcontact(e.target.value)}/>
              </Form.Group>
              <Button onClick = {handlesubmit} variant="primary" className="col-lg-6" style={{background:"rgb(67 , 185, 127"}} type="submit">
                Submit
              </Button>
            </Form>
            <p className="mt-3">Already have an account?<span>SignIn</span></p>
          </div>
         <Sign_img />
        </section>
      </div>
    </>
  );
};
export default Signup;
