import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login as loginAction } from "../../store/session";
import "./landing.css";

const LandingPage = () => {
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            history.push("/home");
        }
    }, [currentUser, history]);

    const navigateToLogin = () => {
        history.push("/login");
    };

    const signup = () => {
        history.push("/signup");
    };

    const demo = async () => {
        const data = await dispatch(loginAction('demo@lit.com', 'demopass'));
        if (data) {
            // Do something if needed
        }
    };

    return (
        <div>
            <div className="landing-Nav">
                <div
                    className="landing-logo-container">
                </div>
                <div className="Creds">
                    <div className="landing-login" onClick={navigateToLogin}>
                        Log in!
                    </div>
                    <div className="landing-SignUp" onClick={signup}>
                        Sign Up!
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
                        <div className="demo-login-landing-body" onClick={demo}>
                            Demo Login
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
                <a href="https://github.com/ProjectWorkTeam/Jello" target="_blank" rel="noopener noreferrer">
                    <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github Repo"></img>
                </a>
            </div>
        </div>
    );
};

export default LandingPage;
