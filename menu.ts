import * as ko from "knockout";

export interface MenuItem {
    title: string;
    visible: () => boolean;
    component: string;
    order: number;
}

export class MenuButton implements MenuItem {
    constructor(public title: string, public action: () => void, public order = 0, public visible: () => boolean = () => true, public component = 'folke-menu-button', public selected = () => false) {
    }
}

export class MenuRouteButton implements MenuItem {
    constructor(public title: string, public route: string, public order = 0, public visible: () => boolean = () => true, public component = 'folke-menu-route-button', public selected = () => false) {
    }
}

export class Menu {
    public menu: KnockoutObservableArray<MenuItem> = ko.observableArray<MenuItem>();
    
    public addItem<T extends MenuItem>(menuItem: T) {
        const m = this.menu();
        let i;
        for (i = 0; i < m.length; i++) {
            if (m[i].order > menuItem.order) {
                this.menu.splice(i, 0, menuItem);
                break;
            }
        }
        if (i === m.length) {
            this.menu.push(menuItem);
        }
        return menuItem;
    }

    public addRouteButton(title: string, route: string) {
        this.addItem(new MenuRouteButton(title, route));
        return this;
    }

    public addButton(title: string, action: () => void, order: number = 0, visible?: () => boolean) {
        this.addItem(new MenuButton(title, action, order, visible));
        return this;
    }

    public addSubMenu(title: string, order: number = 0) {
        return this.addItem(new SubMenu(title, order));
    } 
}

export class SubMenu extends Menu implements MenuItem {
    public collapsed = ko.observable(true);
    public action = () => this.collapsed(!this.collapsed());

    constructor(public title: string, public order = 0, public visible: () => boolean = () => true, public component = 'folke-submenu') {
        super();
    }
}

export default new Menu();