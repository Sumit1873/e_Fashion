import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import "../../assets/style.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="landing">
      <nav className="navbar">
        <h1 className="logo">eFashion</h1>
        {/* <ul className="navbar-nav d-flex flex-row align-items-center" style={{ gap: "10px" }}>
          <li className="nav-item d-none d-md-block"><a href="#home">Home</a></li>
          <li className="nav-item d-none d-md-block"><a href="#shop">Shop</a></li>
          <li className="nav-item d-none d-md-block"><a href="#about">About</a></li>
          <li className="nav-item d-none d-md-block"><a href="#contact">Contact</a></li>
        </ul> */}
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "-5px" }}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>SignUp</button>
        </div>
      </nav>

      {/* Banner Slider */}
      <section className="hero-slider" style={{ marginTop: "110px" }}>
        <Slider {...sliderSettings}>
          <div><img src={banner1} alt="Banner 1" className="banner-img" /></div>
          <div><img src={banner2} alt="Banner 2" className="banner-img" /></div>
          <div><img src={banner3} alt="Banner 3" className="banner-img" /></div>
        </Slider>
        <div className="hero-content">
          <button className="btn shop-btn" onClick={() => navigate("/login")}>Shop Now</button>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or need support, feel free to reach out to us!</p>

          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn contact-btn">Send Message</button>
          </form>

          <div className="contact-info">
            <p><strong>Email:</strong> support@efashion.com</p>
            <p><strong>Phone:</strong> +1 234 567 890</p>
            <p><strong>Address:</strong> 123 Fashion Ave,AHM, IN 380010</p>
          </div>
        </div>
      </section>


      {/* <section className="hero">
        <div className="hero-content">
          <h2>Discover Your <span>Style</span></h2>
          <p>Latest trends and exclusive fashion collections at your fingertips.</p>
          <button className="btn shop-btn">Shop Now</button>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;
