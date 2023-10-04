function Header() {
  return (
    <div className="Header">
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <a
              to="index.html"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
            </a>
          </div>
          <div className="col-lg-9">
            <div className="row gx-0 bg-white d-none d-lg-flex">
              <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2"></i>
                  <p className="mb-0">info@example.com</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2"></i>
                  <p className="mb-0">+012 345 6789</p>
                </div>
              </div>
              <div className="col-lg-5 px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                  <a className="me-3" to="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="me-3" to="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="me-3" to="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="me-3" to="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="" to="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <a to="index.html" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <a to="index.html" className="nav-item nav-link active">
                    Home
                  </a>
                  <a to="about.html" className="nav-item nav-link">
                    About
                  </a>
                  <a to="service.html" className="nav-item nav-link">
                    Services
                  </a>
                  <a to="room.html" className="nav-item nav-link">
                    Rooms
                  </a>
                  <div className="nav-item dropdown">
                    <a
                      to="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a to="booking.html" className="dropdown-item">
                        Booking
                      </a>
                      <a to="team.html" className="dropdown-item">
                        Our Team
                      </a>
                      <a to="testimonial.html" className="dropdown-item">
                        Testimonial
                      </a>
                    </div>
                  </div>
                  <a to="contact.html" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <a
                  to="https://htmlcodex.com/hotel-html-template-pro"
                  className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block"
                >
                  Premium Version<i className="fa fa-arrow-right ms-3"></i>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
