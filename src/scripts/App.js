/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:00
 * @modify date 2020-08-27 13:44:29
 * @desc [description]
 */
import '../styles/Header.css';
import Header from '../templates/Header.html';
import TemplateFactory from './utilities/TemplateFactory.js';

const App = () => {
    const root = document.getElementById('root');
    root.appendChild(TemplateFactory.create(Header));
}

export default App;