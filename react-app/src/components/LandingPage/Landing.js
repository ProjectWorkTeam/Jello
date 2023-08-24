import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jello from "../../assets/Jello.jpg";
import frontPage from "../../assets/FontPage.jpg";
import "./landing.css";

const LandingPage = () => {
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();

    if (currentUser) {
        history.push("/home");
    }

    const login = () => {
        history.push("/login");
    };

    const signup = () => {
        history.push("/signup");
    };

    return (
        <div>
            <div className="landing-Nav">
                <div
                    className="logo-container">
                </div>
                <div className="Creds">
                    <div className="landing-login" onClick={login}>
                        Log in
                    </div>
                    <div className="landing-SignUp" onClick={signup}>
                        Get Jello Free!
                    </div>
                </div>
            </div>
            <div className="Info-Body">
                <div className="Wrapper">
                    <div className="Body">
                        <h2 className="landing-header">
                            Jello brings all your tasks, teammates, and tools together
                        </h2>
                        <h3 className="text-body">Keep everything in the same place.</h3>
                        <div className="SignUp-body" onClick={signup}>
                            Sign up
                        </div>
                    </div>
                    <div className="landing-background-img">
                        {/* <img src={frontPage} alt="background" className="background" /> */}
                    </div>
                </div>
            </div>
            <div className="about">
                <div className="developer">
                    <h4>Alex Kim</h4>
                    <a href="https://www.linkedin.com/in/alexgkim/" target="_blank">
                        <img className="link-icons" src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"></img>
                    </a>
                    <a href="https://github.com/Alex-Kim-SD" target="_blank">
                        <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                </div>
                <div className="developer">
                    <h4>Kim Harris</h4>
                    <a href="https://www.linkedin.com/in/scarlettrobe/" target="_blank">
                        <img className="link-icons" src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"></img>
                    </a>
                    <a href="https://github.com/scarlettrobe" target="_blank">
                        <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                </div>
                <div className="developer">
                    <h4>Peter Guan</h4>
                    <a href="https://www.linkedin.com/in/peter-guan-704171285/" target="_blank">
                        <img className="link-icons" src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"></img>
                    </a>
                    <a href="https://github.com/RetepG" target="_blank">
                        <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                </div>
                <div className="developer">
                    <h4>Joey Enright</h4>
                    <a href="https://www.linkedin.com/in/joey-enright-656057168/" target="_blank">
                        <img className="link-icons" src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"></img>
                    </a>
                    <a href="https://github.com/Jojovial" target="_blank">
                        <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                </div>
            </div>
            <div className="Github-Repo">
                <h4>Git Repo</h4>
                <a href="https://github.com/ProjectWorkTeam/Jello" target="_blank">
                    <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                </a>
            </div>
        </div>
    );
};

export default LandingPage;
