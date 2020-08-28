/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:00
 * @modify date 2020-08-28 10:44:04
 * @desc [description]
 */
import '../styles/Root.css';
import '../styles/Header.css';
import '../styles/Hero.css';
// import '../styles/Content.css';
import '../styles/Footer.css';
// import '../styles/NavigationAside.css';
import Header from '../templates/Header.html';
import Hero from '../templates/Hero.html';
import Content from '../templates/Content.html';
import Footer from '../templates/Footer.html';
import NavigationAside from '../templates/NavigationAside.html';
import TemplateFactory from './utilities/TemplateFactory.js';

/* Struktur dasar element
    body
        noscript
        #root
            header
            main
                hero
                .content
                footer
            aside
                .overlay
                .sidebar
*/
const App = () => {
    const root = document.getElementById('root');
    root.appendChild(TemplateFactory.create(Header));

    const main = document.createElement('main');
    root.appendChild(main);

    //add content
    //referensi struktur https://www.dicoding.com/academies/123/tutorials/4150
    main.appendChild(TemplateFactory.create(Hero));
    main.appendChild(TemplateFactory.create(Content));
    main.appendChild(TemplateFactory.create(Footer));

    //add navigation aside diluar main
    const aside = document.createElement('aside');
    root.appendChild(aside);

    aside.appendChild(TemplateFactory.create(NavigationAside));

    //header humburger (button)
    const hdrHumburger = document.getElementById('header-hamburger');
    hdrHumburger.addEventListener('click', () => hdrHumburger.classList.toggle("change"));
}

export default App;