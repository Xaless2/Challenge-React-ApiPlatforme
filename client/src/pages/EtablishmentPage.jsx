import React, {useState} from 'react'
import NavBar from '../components/layout/NavBar'
import GoogleApiWrapper from '../components/common/GoogleApiWrapper'



function EtablishmentPage() {
  return (
  <>
  <NavBar/>
  
  <div>
    <h1>Nos établissements via la map </h1>

    <GoogleApiWrapper/>
  </div>
  </>
  )
}

export default EtablishmentPage