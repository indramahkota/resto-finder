/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-04 16:29:30
 * @modify date 2020-09-04 16:29:30
 * @desc [description]
 */

import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faGoogle, faGitlab, faFacebookF } from '@fortawesome/free-brands-svg-icons';

library.add(faMapMarkerAlt, faGithub, faLinkedinIn, faGoogle, faGitlab, faFacebookF);

export default class AppIcons {
    static readonly GITHUB = icon({ prefix: 'fab', iconName: 'github' });
    static readonly LINKEDIN = icon({ prefix: 'fab', iconName: 'linkedin-in' });
    static readonly GOOGLE = icon({ prefix: 'fab', iconName: 'google' });
    static readonly GITLAB = icon({ prefix: 'fab', iconName: 'gitlab' });
    static readonly FACEBOOK = icon({ prefix: 'fab', iconName: 'facebook' });
    static readonly MARKER = icon({ prefix: 'fas', iconName: 'map-marker-alt' });
}