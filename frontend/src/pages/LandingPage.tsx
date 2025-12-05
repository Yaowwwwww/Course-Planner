import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Menu, X } from 'lucide-react';
import styles from '../styles/LandingPage.module.css';

// 导入图片资源
import berkeleyBg from '../assets/berkeley.jpg';
import berkeley2Bg from '../assets/berkeley2.jpg';
import class4Bg from '../assets/class4.jpg';
import chatbotIcon from '../assets/chatbot1.png';
import smcLogo from '../assets/SMClogo.png';
import rmpImage from '../assets/RMP.png';
import berkeleyGuideImage from '../assets/berkeley_academic_guide.jpg';
import redditImage from '../assets/reddit.png';
import chatbotImage from '../assets/chatbot.avif';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // TODO: 对接 API
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', newsletterEmail);
    // TODO: 对接 API
    alert('Thank you for subscribing!');
    setNewsletterEmail('');
  };

  return (
    <div className={styles.landingPage}>
      {/* Header Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src={smcLogo} alt="Logo" />
            </div>
            <span className={styles.logoText}>Course Planner@Berkeley</span>
          </div>

          <nav className={styles.nav}>
            <button onClick={() => navigate('/planner')} className={styles.navLink}>Recent</button>
            <button onClick={() => navigate('/planner/favorites')} className={styles.navLink}>Favorites</button>
            <button onClick={() => navigate('/planner/archive')} className={styles.navLink}>Archive</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero_section"
        className={styles.heroSection}
        style={{ backgroundImage: `url(${berkeleyBg})` }}
      >
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            The First All-in-One<br />
            Course Selection and<br />
            Planning System<br />
            At Berkeley
          </h2>
          <p className={styles.heroText}>
            <span className={styles.highlight}>StemyCourses@Berkeley</span> is the ultimate<br />
            platform for Berkeley students to explore<br />
            and plan their STEM classes efficiently.<br />
            Discover course insights, get senior advice,<br />
            and simplify your academic journey.
          </p>
          <button
            onClick={() => navigate('/planner')}
            className={styles.learnMoreBtn}
          >
            Start Exploring Now！
          </button>
        </div>
      </section>

      {/* Our Goal Section */}
      <section
        className={styles.storySection}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${berkeleyBg})` }}
      >
        <div className={styles.storyContainer}>
          <div className={styles.textSection}>
            <h2 className={styles.sectionTitle}>
              <strong><em>Our Goal</em></strong>
            </h2>
            <p className={styles.storyText}>
              <em>
                Our website is dedicated to helping Berkeley's computer science (CS) and data science (DS) students choose courses efficiently. Due to the variety of CS and DS course options, many students are easily confused when planning their learning paths. Our website will provide a detailed introduction of each course and collect course selection suggestions and feedback from seniors to help students choose suitable courses from different directions. By summarizing recommendations and planning suggestions, our application helps users make learning plans more easily and solves the problems of information asymmetry and selection difficulties encountered by students in the process of course selection.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={styles.helpSection}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${class4Bg})` }}
      >
        <div className={styles.helpTitle}>
          <h2 className={styles.sectionTitle}>
            <strong><em>All-in-One Information Gathering<br />Decision Making Platform</em></strong>
          </h2>
        </div>
        <div className={styles.helpContainer}>
          {/* Feature 1: Rate My Professor */}
          <div className={styles.helpBlock}>
            <h3 className={styles.featureTitle}>
              <strong><em>Rate My Professor</em></strong>
            </h3>
            <img src={rmpImage} alt="Rate My Professor" className={styles.featureImg} />
            <p className={styles.featureText}>
              <em>
                Rate My Professor offers student-driven ratings and reviews of instructors. It helps Berkeley students make informed decisions by providing insights on teaching quality, workload, and exam styles, aiding in course selection tailored to individual learning preferences.
              </em>
            </p>
          </div>

          {/* Feature 2: Berkeley Academic Guide */}
          <div className={styles.helpBlock}>
            <h3 className={styles.featureTitle}>
              <strong><em>Berkeley Academic Guide</em></strong>
            </h3>
            <img src={berkeleyGuideImage} alt="Berkeley Academic Guide" className={styles.featureImg} />
            <p className={styles.featureText}>
              <em>
                Berkeley Academic Guide is the official resource for course descriptions, prerequisites, and academic policies. It provides detailed overviews and scheduling information, allowing students to efficiently plan their STEM coursework and degree paths.
              </em>
            </p>
          </div>

          {/* Feature 3: Reddit */}
          <div className={styles.helpBlock}>
            <h3 className={styles.featureTitle}>
              <strong><em>Reddit</em></strong>
            </h3>
            <img src={redditImage} alt="Reddit" className={styles.featureImg} />
            <p className={styles.featureText}>
              <em>
                Reddit's Berkeley and STEM-related communities offer crowdsourced advice on courses, professors, and student experiences. With real-time discussions and reviews, it helps students gather diverse opinions and strategies for course success.
              </em>
            </p>
          </div>

          {/* Feature 4: AI ChatBot */}
          <div className={styles.helpBlock}>
            <h3 className={styles.featureTitle}>
              <strong><em>AI ChatBot</em></strong>
            </h3>
            <img src={chatbotImage} alt="AI ChatBot" className={styles.featureImg} />
            <p className={styles.featureText}>
              <em>
                Our AI ChatBot remembers your course history and provides personalized recommendations using a fine-tuned model. It offers interactive and comprehensive support for planning and refining your academic path with ease and confidence.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={styles.contactSection}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${berkeley2Bg})` }}
      >
        <h1 className={styles.contactTitle}>ANY QUESTION? CONTACT US</h1>
        <form className={styles.contactForm} onSubmit={handleContactSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
          />

          <label htmlFor="email">Your email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            required
          />

          <label htmlFor="message">Message*</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            required
          ></textarea>

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className={styles.footerSection}>
        <div className={styles.footerContainer}>
          <div className={styles.signup}>
            <h3>SIGN UP FOR UPDATES</h3>
            <form className={styles.signupForm} onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className={styles.contact}>
            <h3>CONTACT</h3>
            <p>cubstart@berkeley.edu</p>
            <p>CalBerkeleyStudent@berkeley.edu</p>
            <p>(909)-909-9909</p>
          </div>
          <div className={styles.socialMedia}>
            <h3>SOCIAL MEDIA</h3>
            <div className={styles.icons}>
              <a href="#" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="TikTok">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating ChatBot - Bottom Right */}
      <div className={styles.chatbotSection}>
        <img
          src={chatbotIcon}
          alt="ChatBot Icon"
          className={styles.chatbotFloating}
          onClick={() => navigate('/planner')}
        />
      </div>
    </div>
  );
};

export default LandingPage;
