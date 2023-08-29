import "./contact.css"

const Contact = () => {
    return (
        <div>
            <div className="contact-container">
                <h2>Contact The Jello Team At</h2>
                <div className="contact-repo">Jello Repo</div>
                <div className="contact">
                    <a className="github-repo" target="_blank" href="https://github.com/ProjectWorkTeam/Jello">
                        <i classname="Jello-Repo" class="fab fa-github fa-lg"></i></a>
                </div>
                <div className="contact-info">
                    Peter Guan
                    <a className="linkedIn" target="_blank" href="https://www.linkedin.com/in/peter-guan-704171285/">
                        <i class="fab fa-linkedin fa-lg"></i></a>
                    <a className="github" target="_blank" href="https://github.com/RetepG">
                        <i class="fab fa-github fa-lg"></i></a>
                </div>
                <div className="contact-info">
                    Alexander Kim
                    <a className="linkedIn" target="_blank" href="https://www.linkedin.com/in/alexgkim/">
                        <i class="fab fa-linkedin fa-lg"></i></a>
                    <a className="github" target="_blank" href="https://github.com/Alex-Kim-SD">
                        <i class="fab fa-github fa-lg"></i></a>
                </div>
                <div className="contact-info">
                    Joey Enright
                    <a className="linkedIn" target="_blank" href="https://www.linkedin.com/in/joey-enright/">
                        <i class="fab fa-linkedin fa-lg"></i></a>
                    <a className="github" target="_blank" href="https://github.com/Jojovial">
                        <i class="fab fa-github fa-lg"></i></a>
                </div>
                <div className="contact-info">
                    Kimberly Harris
                    <a className="linkedIn" target="_blank" href="https://www.linkedin.com/in/scarlettrobe/">
                        <i class="fab fa-linkedin fa-lg"></i></a>
                    <a className="github" target="_blank" href="https://github.com/scarlettrobe">
                        <i class="fab fa-github fa-lg"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Contact
