import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-light text-center text-lg-start">
      <div class="container p-4">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#!" class="text-dark">FAQ</a></li>
              <li class="mb-2"><a href="#!" class="text-dark">Mentions Légales</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#!" class="text-dark">Contactez-moi</a></li>
              <li class="mb-2"><a href="#!" class="text-dark"><i class="bi bi-instagram" style={{
                fontSize: '2rem'
              }}></i></a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#!" class="text-dark">CGV</a></li>
              <li class="mb-2"><a href="#!" class="text-dark">Conditions de Livraison</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="text-center p-3">
        © FÉLIX JUNOT 2024
      </div>
    </footer>
  )
}

export default Footer