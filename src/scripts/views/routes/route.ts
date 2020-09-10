import { TemplateResult } from "lit-html";

type Create = (data?: MatchObject) => TemplateResult | void;

export interface IParam {
    key: string,
    value: string
}

export interface MatchObject {
    path: string | null;
    url: string;
    params: IParam[];
}

export interface MatchPathOptions {
    path: string;
    exact: boolean | undefined;
}

export interface MatchPathResult extends MatchObject {
    isExact: boolean;
}

/*  Kasus Penggunaan
    url (/find)      | isExact=true                            | isExact=false
    -------------------------------------------------------------------------------------------------
    /find            | Yes ([])                                | Yes ([])
    /find/yRXcb88    | No                                      | Yes ([])

    url (/find/:id)  | isExact=true                            | isExact=false
    -------------------------------------------------------------------------------------------------
    /find            | Yes ([{key: 'id', value: undefined}])   | Yes ([{key: 'id', value: undefined}])    
    /find/yRXcb88    | No                                      | Yes ([{key: 'id', value: 'hAD654vv'}])
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
        const match = this.match(); console.log(`match path: ${JSON.stringify(match)}`); //debug
        if (match)
            return this.render(match);
        return;
    }
}

export function matchPath(pathname: string, options: MatchPathOptions): MatchPathResult | null {
    const { exact = false, path } = options;

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true,
            params: []
        }
    }

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

// '#/agaga/iiii/:id/:test/:hhhh' -> ['id', 'test', 'hhh']
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