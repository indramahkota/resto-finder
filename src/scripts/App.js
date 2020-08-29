/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:00
 * @modify date 2020-08-28 23:22:32
 * @desc [description]
 */
import AppConfig from '../scripts/globals/app-config.js'

const App = () => {
    if(window.localStorage.getItem(AppConfig.THEME_LOCAL_STORAGE_NAME) === 'dark') {
        window.document.body.classList.add('dark');
    } else {
        window.document.body.classList.remove('dark');
    }
}

export default App;