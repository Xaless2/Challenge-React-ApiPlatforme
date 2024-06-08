import React from 'react'
import { FcAdvance } from "react-icons/fc";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import { VscAccount } from "react-icons/vsc";
import "../styles/register.css"


function RegisterPage() {
  return (
    <>
    
      <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
      <div class="signup -mt-24">
      {/* <img src={logo}  alt="PlaniFit" className='-mt-96' /> */}
      <h2>Créer un compte</h2>
      <form class="form">
        <div class="textbox">
          <input type="text" required />
          <label>firstName</label>
          <span class="material-symbols-outlined"><VscAccount /></span>
        </div>
        <div class="textbox">
          <input type="text" required />
          <label>lastname</label>
          <span class="material-symbols-outlined"><VscAccount /></span>
        </div>
        <div class="textbox">
          <input type="text" required />
          <label>Email</label>
          <span class="material-symbols-outlined"><AiOutlineMail /> </span>
        </div>

        <div class="textbox">
          <input type="text" required />
          <label>role</label>
          <span class="material-symbols-outlined"><AiOutlineMail /> </span>
        </div>
        <div class="textbox">
          <input type="password" required />
          <label>Password</label>
          <span class="material-symbols-outlined"><AiOutlineLock /></span>
        </div>
        <p>
          Signed up already?
          <a href="#">Login here</a>
        </p>
        <button type="submit">
         créer un compte
          <span class="material-symbols-outlined"><FcAdvance /></span>
        </button>
      </form>
    </div>
    
    </>
    
    
  )
}

export default RegisterPage