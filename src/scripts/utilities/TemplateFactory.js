/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:37:32
 * @modify date 2020-08-26 21:37:33
 * @desc [description]
 */
export default class TemplateFactory {
    static create(html) {
        const template = document.createElement("template");
        template.innerHTML  = html;
        return template.content.cloneNode(true);
    }
}