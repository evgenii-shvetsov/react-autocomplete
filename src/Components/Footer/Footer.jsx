import githubLogo from "../../assets/githubLogo.png";
import linkedinLogo from "../../assets/linkedinLogo.png";
import personalLogo from "../../assets/personalLogo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <section className="footer-info">
        <div className="social_media">
          <a
            href="https://github.com/evgenii-shvetsov/react-autocomplete"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="github logo" />
          </a>
          <a
            href="https://shvetsov.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={personalLogo} alt="personal website logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/shvetsovea/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="linkedin logo" />
          </a>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
