import React from "react"
import "../static/styles/footer.css";
import logo from "../static/img/ibw-life.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare, faLinkedinIn, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
      <>
          <footer className="footer bg-light">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6 h-100 text-center text-lg-left auto">
                          <img
                              src={logo}
                              className="d-inline-block"
                              alt="iBathwater life logo"
                          />
                          <p className={"text-footer"}>
                              The project Advanced urban water management to efficiently ensure bathing water quality (Life iBATHWATER), is co-funded by the LIFE Programme of the European Union under contract number  LIFE17 ENV/ES/000396.
                          </p>
                      </div>
                      <div className="col-lg-6 h-100 text-center text-lg-right auto">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item mr-3">
                                  <a href="#">
                                      <FontAwesomeIcon icon={faFacebookSquare} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                  <a href="https://twitter.com/iBATHWATER_EU?lang=es">
                                      <FontAwesomeIcon icon={faTwitterSquare} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                  <a href="#">
                                      <FontAwesomeIcon icon={faLinkedinIn} size={'2x'} color={"#007bff"} ></FontAwesomeIcon>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </footer>
      </>
  );
};