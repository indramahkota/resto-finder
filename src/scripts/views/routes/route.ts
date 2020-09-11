import { TemplateResult } from "lit-html";

type Create = (data?: MatchObject) => TemplateResult | void;

interface IParam {
    key: string;
    value: string;
}

export interface MatchObject {
    path: string | null;
    url: string;
    isExact: boolean;
    params: IParam[];
}

interface MatchPathOptions {
    path: string;
    exact: boolean | undefined;
}

/*  Kasus Penggunaan
    url (/find)      | isExact=true                            | isExact=false
    -------------------------------------------------------------------------------------------------
    /find            | Yes ([])                                | Yes ([])
    /find/yRXcb88    | No                                      | Yes ([])

    url (/find/:id)  | isExact=true                            | isExact=false
    -------------------------------------------------------------------------------------------------
    /find            | Yes ([{key: 'id', value: undefined}])   | Yes ([{key: 'id', value: undefined}])    
    /find/yRXcb88    | No                                      | Yes ([{key: 'id', value: 'yRXcb88'}])
*/

export class Route {
    path: string;
    render: Create;
    exact?: boolean | undefined;

    constructor(path: string, render: Create, exact?: boolean) {
        this.path = path;
        this.render = render;
        this.exact = exact;
    }

    match(): MatchObject | null {
        return matchPath(
            window.location.hash.slice(1),
            { path: this.path, exact: this.exact }
        );
    }

    mount(): TemplateResult | void {
        const match = this.match();
        if (match)
            return this.render(match);
        return;
    }
}

function matchPath(pathname: string, options: MatchPathOptions): MatchObject | null {
    const { exact = false, path } = options;

    if (pathname === '')
        pathname = '/';

    const match = new RegExp(`^/${pathWithoutParameters(path)}`).exec(pathname);

    if (!match) {
        return null;
    }

    const url = match[0];
    const isExact = url === pathname;

    if (exact && !isExact) {
        return null;
    }

    const params = returnParameters(path, pathname);

    return { path, url, isExact, params }
}

// '#/agaga/:id & #/agaga/hAD654vv' -> ([{key: 'id', value: 'hAD654vv'}])
function returnParameters(path: string, pathname: string): IParam[] {
    const params: IParam[] = [];
    const paramNames = path.split('/');
    const paramValues = pathname.split('/');

    paramNames.forEach((name: string | number, index: number) => {
        if (name.toString().indexOf(':') > -1) {
            params.push({
                key: paramNames[index].toString().substr(1),
                value: String(paramValues[index])
            });
        }
    })
    return params;
}

// // '#/aaa/bbb/:id/:haha' -> 'aaa/bbb'
function pathWithoutParameters(path: string): string {
    const pathArray = path.split('/');
    let firstParamIndex = pathArray.length;

    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i].indexOf(':') > -1) {
            firstParamIndex = i;
            break;
        }
    }
    return pathArray.slice(1, firstParamIndex).join('/');
}