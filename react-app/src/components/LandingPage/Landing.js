// import React from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import jello from "../../assets/Jello.jpg"
// import frontPage from "../../assets/FontPage.jpg"
// import './landing.css'

// const LandingPage = () => {
//     const currentUser = useSelector(state => state.session.user)
//     const history = useHistory()

//     if (currentUser) {
//         history.push("/board")
//     }

//     const login = () => {
//         history.push("/login")
//     }

//     const signup = () => {
//         history.push("/signup")
//     }

//     return (
//         <div>
//             <div className="Nav">
//                 <div className="logo-container">
//                     <div className="logo-style">
//                         <img src={jello} alt="Jello" className="logo"></img>
//                     </div>
//                     Jello
//                 </div>
//                 <div className="Creds">
//                     <div className="login" onClick={login}> Log in</div>
//                     <div className="SignUp" onClick={signup}>Get Jello for free</div>
//                 </div>
//             </div>
//             <div className="Info-Body">
//                 <div className="Wrapper">
//                     <div className="Body">
//                         <h1 className="header">Jello brings all your tasks, teammates, and tools together</h1>
//                         <div className="text-body">Keep everything in the same place.</div>
//                         <div className="SignUp-body" onClick={signup}>Sign up</div>
//                     </div>
//                     <div className="background-img">
//                         <img src={frontPage} alt="background" className="background"></img>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default LandingPage;

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
        history.push("/board");
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
                <div className="logo-container">
                    <div className="logo-style">
                        <img src={jello} alt="Jello" className="logo" />
                    </div>
                    Jello
                </div>
                <div className="Creds">
                    <div className="landing-login" onClick={login}>
                        Log in
                    </div>
                    <div className="landing-SignUp" onClick={signup}>
                        Get Jello for free
                    </div>
                </div>
            </div>
            <div className="Info-Body">
                <div className="Wrapper">
                    <div className="Body">
                        <h1 className="header">
                            Jello brings all your tasks, teammates, and tools together
                        </h1>
                        <div className="text-body">Keep everything in the same place.</div>
                        <div className="SignUp-body" onClick={signup}>
                            Sign up
                        </div>
                    </div>
                    <div className="landing-background-img">
                        <img src={frontPage} alt="background" className="background" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
