import * as ko from "knockout";
export interface MenuItem {
    title: ko.Observable<string>;
    visible: () => boolean;
    component: string;
    order: number;
}
export declare class MenuButton implements MenuItem {
    title: ko.Observable<string>;
    action: () => void;
    order: number;
    visible: () => boolean;
    component: string;
    selected: () => boolean;
    constructor(title: ko.Observable<string>, action: () => void, order?: number, visible?: () => boolean, component?: string, selected?: () => boolean);
}
export declare class MenuRouteButton implements MenuItem {
    title: ko.Observable<string>;
    route: string;
    order: number;
    visible: () => boolean;
    component: string;
    selected: () => boolean;
    constructor(title: ko.Observable<string>, route: string, order?: number, visible?: () => boolean, component?: string, selected?: () => boolean);
}
export declare class Menu {
    title: ko.Observable<string>;
    collapsed: ko.Observable<boolean>;
    action: () => ko.Observable<boolean>;
    menu: ko.ObservableArray<MenuItem>;
    constructor(title: ko.Observable<string>);
    addItem<T extends MenuItem>(menuItem: T): T;
    addRouteButton(title: ko.Observable<string>, route: string): this;
    addButton(title: ko.Observable<string>, action: () => void, order?: number, visible?: () => boolean): this;
    addCustomSubMenu(component: string, title?: ko.Observable<string>, order?: number, visible?: () => boolean): SubMenu;
    addSubMenu(title: ko.Observable<string>, order?: number, visible?: () => boolean): SubMenu;
}
export declare class SubMenu extends Menu implements MenuItem {
    order: number;
    visible: () => boolean;
    component: string;
    constructor(title: ko.Observable<string>, order?: number, visible?: () => boolean, component?: string);
}
declare var _default: Menu;
export default _default;
