import React, { useEffect } from 'react';


function Footer() {
  useEffect(() => {
    // Load JavaScript libraries and scripts
    const scriptsToLoad = [
      'https://code.jquery.com/jquery-3.4.1.min.js',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js',
      'lib/wow/wow.min.js',
      'lib/easing/easing.min.js',
      'lib/waypoints/waypoints.min.js',
      'lib/counterup/counterup.min.js',
      'lib/owlcarousel/owl.carousel.min.js',
      'lib/tempusdominus/js/moment.min.js',
      'lib/tempusdominus/js/moment-timezone.min.js',
      'lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js',
      'js/main.js',
    ];

    scriptsToLoad.forEach((scriptSrc) => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup: Remove added scripts when the component unmounts
      scriptsToLoad.forEach((scriptSrc) => {
        const script = document.createElement('script');
        script.src = scriptSrc;
        document.body.removeChild(script);
      });
    };
  }, []);

  return (
    <div className="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s">
            <div className="container pb-5">
                <div className="row g-5">
                    <div className="col-md-6 col-lg-4">
                        <div className="bg-primary rounded p-4">
                            <a to="index.html"><h1 className="text-white text-uppercase mb-3">Hotelier</h1></a>
                            <p className="text-white mb-0">
								Download <a className="text-dark fw-medium" to="https://htmlcodex.com/hotel-html-template-pro">Hotelier – Premium Version</a>, build a professional website for your hotel business and grab the attention of new visitors upon your site’s launch.
							</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <h6 className="section-title text-start text-primary text-uppercase mb-4">Contact</h6>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" to=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" to=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" to=""><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" to=""><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="row gy-5 g-4">
                            <div className="col-md-6">
                                <h6 className="section-title text-start text-primary text-uppercase mb-4">Company</h6>
                                <a className="btn btn-link" to="">About Us</a>
                                <a className="btn btn-link" to="">Contact Us</a>
                                <a className="btn btn-link" to="">Privacy Policy</a>
                                <a className="btn btn-link" to="">Terms & Condition</a>
                                <a className="btn btn-link" to="">Support</a>
                            </div>
                            <div className="col-md-6">
                                <h6 className="section-title text-start text-primary text-uppercase mb-4">Services</h6>
                                <a className="btn btn-link" to="">Food & Restaurant</a>
                                <a className="btn btn-link" to="">Spa & Fitness</a>
                                <a className="btn btn-link" to="">Sports & Gaming</a>
                                <a className="btn btn-link" to="">Event & Party</a>
                                <a className="btn btn-link" to="">GYM & Yoga</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" to="#">Your Site Name</a>, All Right Reserved. 
							
							Designed By <a className="border-bottom" to="https://htmlcodex.com">HTML Codex</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a to="">Home</a>
                                <a to="">Cookies</a>
                                <a to="">Help</a>
                                <a to="">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
  );
}

export default Footer;
