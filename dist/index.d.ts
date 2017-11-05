/// <reference types="knockout" />
export interface MenuItem {
    title: KnockoutObservable<string> | null;
    visible: KnockoutObservable<boolean>;
    component: string;
    order: number;
}
export declare class MenuButton implements MenuItem {
    title: KnockoutObservable<string>;
    action: () => void;
    order: number;
    visible: KnockoutObservable<boolean>;
    component: string;
    selected: () => boolean;
    constructor(title: KnockoutObservable<string>, action: () => void, order?: number, visible?: KnockoutObservable<boolean>, component?: string, selected?: () => boolean);
}
export declare class MenuRouteButton implements MenuItem {
    title: KnockoutObservable<string>;
    route: string;
    order: number;
    visible: KnockoutObservable<boolean>;
    component: string;
    selected: () => boolean;
    constructor(title: KnockoutObservable<string>, route: string, order?: number, visible?: KnockoutObservable<boolean>, component?: string, selected?: () => boolean);
}
export declare class Menu {
    title: KnockoutObservable<string> | null;
    collapsed: KnockoutObservable<boolean>;
    action: () => void;
    menu: KnockoutObservableArray<MenuItem>;
    constructor(title: KnockoutObservable<string> | null);
    addItem<T extends MenuItem>(menuItem: T): T;
    addRouteButton(title: KnockoutObservable<string>, route: string): this;
    addButton(title: KnockoutObservable<string>, action: () => void, order?: number, visible?: KnockoutObservable<boolean>): this;
    addCustomSubMenu(component: string, title?: KnockoutObservable<string> | null, order?: number, visible?: KnockoutObservable<boolean>): SubMenu;
    addSubMenu(title: KnockoutObservable<string>, order?: number, visible?: KnockoutObservable<boolean>): SubMenu;
}
export declare class SubMenu extends Menu implements MenuItem {
    order: number;
    visible: KnockoutObservable<boolean>;
    component: string;
    constructor(title: KnockoutObservable<string> | null, order?: number, visible?: KnockoutObservable<boolean>, component?: string);
}
