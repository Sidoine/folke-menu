import * as ko from "knockout";

export interface MenuItem {
    title: ko.Observable<string>;
    visible: () => boolean;
    component: string;
    order: number;
}

export class MenuButton implements MenuItem {
    constructor(public title: ko.Observable<string>, public action: () => void, public order = 0, public visible: () => boolean = () => true, public component = 'folke-menu-button', public selected = () => false) {
    }
}

export class MenuRouteButton implements MenuItem {
    constructor(public title: ko.Observable<string>, public route: string, public order = 0, public visible: () => boolean = () => true, public component = 'folke-menu-route-button', public selected = () => false) {
    }
}

export class Menu {
    public collapsed = ko.observable(true);
    public action = () => this.collapsed(!this.collapsed());
    public menu: ko.ObservableArray<MenuItem> = ko.observableArray<MenuItem>();
    
    constructor(public title: ko.Observable<string>) {
    }

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

    public addRouteButton(title: ko.Observable<string>, route: string) {
        this.addItem(new MenuRouteButton(title, route));
        return this;
    }

    public addButton(title: ko.Observable<string>, action: () => void, order: number = 0, visible?: () => boolean) {
        this.addItem(new MenuButton(title, action, order, visible));
        return this;
    }

    public addCustomSubMenu(component: string, title: ko.Observable<string> = null, order: number = 0, visible: () => boolean = () => true) {
        return this.addItem(new SubMenu(title, order, visible, component));
    } 

    public addSubMenu(title: ko.Observable<string>, order: number = 0, visible: () => boolean = () => true) {
        return this.addItem(new SubMenu(title, order, visible));
    } 
}

export class SubMenu extends Menu implements MenuItem {
    constructor(title: ko.Observable<string>, public order = 0, public visible: () => boolean = () => true, public component = 'folke-submenu') {
        super(title);
    }
}

export default new Menu(ko.observable(''));