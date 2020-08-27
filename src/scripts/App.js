/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:00
 * @modify date 2020-08-27 20:40:06
 * @desc [description]
 */
import '../styles/Header.css';
import Header from '../templates/Header.html';
import TemplateFactory from './utilities/TemplateFactory.js';

const App = () => {
    const root = document.getElementById('root');
    root.appendChild(TemplateFactory.create(Header));

    //header humburger button
    const hdrHumburger = document.getElementById('header-menu-hamburger');
    hdrHumburger.addEventListener('click', () => hdrHumburger.classList.toggle("change"));
}

export default App;