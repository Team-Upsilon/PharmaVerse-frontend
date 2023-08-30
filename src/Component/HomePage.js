import React, { useState } from "react";
// import "./HomePage.css";
import logo from "../Images/logoPharma.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Drawer, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import dropbox from "../homeimg/images/icons/clients/dropbox.svg";
import atom from "../homeimg/images/icons/clients/atom.svg";
import github from "../homeimg/images/icons/clients/github.svg";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AboutImg2 from '../Images/aboutimg2.jpg'
import AboutImg1 from '../Images/aboutimg.jpg'
import { AnimatePresence, motion } from "framer-motion"

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 906px)");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeService, setActiveService] = useState("web");
  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeDrawer = () => {
    setIsMobileMenuOpen(false);
  };
  const servicesData = [
    {
      id: "web",
      title: "Web Development",
      description:
        "Our web development team creates modern and responsive websites...",
    },
    {
      id: "app",
      title: "App Development",
      description:
        "We specialize in developing innovative mobile applications...",
    },
    {
      id: "design",
      title: "Design Services",
      description:
        "Our design experts create visually stunning and user-friendly designs...",
    },
  ];
  const worksData = [
    {
      id: 1,
      title: "Project 1",
      description: "Description of Project 1",
      imageUrl: "/path-to-image1.jpg",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description of Project 2",
      imageUrl: "/path-to-image2.jpg",
    },
    // Add more work items as needed
  ];

  return (
    <div style={{ margin: "0" }}>
      <section class="hero">
        <div class="main-width">
          <header className="homepage-header">
            <div class="logo">
              <img src={logo} alt="" width={"200rem"} height={"50rem"} />
            </div>
            <nav>
              {isMobile && (
                <div style={{ cursor: "pointer" }} onClick={toggleMobileMenu}>
                  <MenuIcon color="success" />
                </div>
              )}
              {!isMobile && (
                <ul className={`nav-list ${isMobileMenuOpen ? "hide" : ""}`}>
                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      Home
                    </a>
                  </li>

                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ textDecoration: "none" }}>
                      Works
                    </a>
                  </li>
                  <li class="btn">
                    <a href="#" style={{ textDecoration: "none" }}>
                      Contact Us
                    </a>
                  </li>
                  <li class="btn1">
                    <a href="#" style={{ textDecoration: "none", color: "white" }}>
                      Login/Signup
                    </a>
                  </li>
                </ul>
              )}
            </nav>
          </header>

          <div className="container">
            <div className="hero-text">
              <h3>Hi, There !</h3>
              <div className="h1">
                This is <span>PharmaVerse</span>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                odit unde placeat, enim tenetur aspernatur necessitatibus rem
                earum facilis perferendis! Perferendis voluptates reiciendis
                doloribus rem a, ipsa tempore dolorum magnam.
              </p>
              <div className="social">
                <a href="#">
                  <FacebookIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <LinkedInIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <InstagramIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
                <a href="#">
                  <TwitterIcon
                    color="primary"
                    sx={{ fontSize: 30, color: "whitesmoke" }}
                  />
                </a>
              </div>
              <Stack
                sx={{ justifyContent: "center", alignItems: "center" }}
                direction={"row"}
              >
                <button
                  className="btn0"
                  type="button"
                  style={{ width: "12rem" }}
                >
                  More About Us ▼
                </button>
              </Stack>
            </div>

          </div>
        </div>
      </section>

      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={isMobile ? toggleMobileMenu : closeDrawer}
      >
        <div class="logo" style={{ marginLeft: "18px", marginTop: "10px" }}>
          <img src={logo} alt="" width={"200rem"} height={"50rem"} />
        </div>
        <Divider sx={{ width: "100%" }} />
        <div
          style={{
            width: "250px",
            padding: "20px",
          }}
        >
          <List>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="Home" sx={{textAlign:"center" }}/> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </a>
              </li>
            </ListItem>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="About" sx={{ textAlign: "center" }} /> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  About
                </a>
              </li>
            </ListItem>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="Services" sx={{ textAlign: "center" }} /> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Services
                </a>
              </li>
            </ListItem>
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              {/* <ListItemText primary="Works" sx={{ textAlign: "center" }} /> */}
              <li>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Works
                </a>
              </li>
            </ListItem>
            <ListItem
              sx={{
                textAlign: "center",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <li class="btn">
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Contact Us
                </a>
              </li>
            </ListItem>
            <Divider />
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              <li class="btn">
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Login/Signup
                </a>
              </li>
            </ListItem>
          </List>
        </div>
        <Divider sx={{ width: "100%" }} />
      </Drawer>
      <section className="about">
        <div className="about-container">
          <div className="about-tabs">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => handleTabChange("overview")}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => handleTabChange("mission")}
            >
              Our Mission
            </button>
            <button
              className={`tab-btn ${activeTab === "values" ? "active" : ""}`}
              onClick={() => handleTabChange("values")}
            >
              Values
            </button>
          </div>
          <div className="about-content">
            {activeTab === "overview" && (
              <><div className="about-text">
                <h2>About Us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  {/* ... */}
                </p>
              </div>
                <div className="about-image">
                  <img src={AboutImg2} alt="About Us" />
                </div></>
            )}
            {activeTab === "mission" && (
              <> <div className="about-text">
                <h2>Our Mission</h2>
                <p>
                  We are committed to providing innovative solutions that
                  {/* ... */}
                </p>
              </div>
                <div className="about-image">
                  <img src={AboutImg1} alt="About Us" />
                </div></>
            )}
            {activeTab === "values" && (
              <><div className="about-text">
                <h2>Our Values</h2>
                <p>
                  Our core values include integrity, teamwork, {/* ... */}
                </p>
              </div>
                <div className="about-image">
                  <img src={AboutImg2} alt="About Us" />
                </div></>
            )}

          </div>
        </div>
      </section>

      <section className="services">
        <div className="services-container">
          <div className="services-grid">
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                className={`service-card ${activeService === service.id ? "active" : ""}`}
                onClick={() => handleServiceClick(service.id)}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
          <AnimatePresence custom={activeService}>
            {activeService && (
              <motion.div
                className="service-details"
                key={activeService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 1 },
                  zIndex: -1,
                  position: "absolute",
                }}
              >
                <h2>{servicesData.find((s) => s.id === activeService)?.title}</h2>
                <p>{servicesData.find((s) => s.id === activeService)?.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="works">
        <div className="works-container">
          <h2 className="section-heading">Our Works</h2>
          <div className="works-grid">
            {worksData.map((work) => (
              <motion.div
                key={work.id}
                className="work-card"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={work.imageUrl} alt={work.title} />
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="contact">
        <div className="contact-container">
          <h2 className="section-heading">Contact Us</h2>
          <p>If you have any questions or inquiries, please feel free to contact us.</p>
          <a href="/contact" className="contact-button">
            Contact Us
          </a>
        </div>
      </section>
      <div className="bottom" style={{ padding: "0" }}>
        <p>© 2023 Upsilon - All Rights Reserved</p>{" "}
      </div>
    </div>
  );
};
export default HomePage;
