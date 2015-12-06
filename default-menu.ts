import * as ko from "knockout";
import * as Menu from "./menu";

ko.components.register('folke-menu', {
    template: `<ul data-bind="foreach: menu">
<li data-bind="visible: visible, component: { name: component, params: $data }"></li>
</ul>`,
    viewModel: { instance: Menu.default }
});

class MenuButtonComponent {
    public title: string;
    public action: () => void;
    constructor(params:Menu.MenuButton) {
        this.title = params.title;
        this.action = params.action;
    }
}

ko.components.register('folke-menu-button', {
    template: `<button data-bind="text: title, click: action"></button>`,
    viewModel: MenuRouteButtonComponent
});

class MenuRouteButtonComponent {
    public title: string;
    public link: string;
    constructor(params: Menu.MenuRouteButton) {
        this.title = params.title;
        this.link = '#' + params.route;
    }
}

ko.components.register('folke-menu-route-button', {
    template: `<a data-bind="text: title, attr: { href: link }"></span>`,
    viewModel: MenuRouteButtonComponent
});

class SubMenuComponent {
    public menu: KnockoutObservableArray<Menu.MenuItem>;
    public collapsed: KnockoutObservable<boolean>;
    public title: string;
    constructor(params: Menu.SubMenu) {
        this.menu = params.menu;
        this.collapsed = params.collapsed;
        this.title = params.title;
    }
    public toggle = () => this.collapsed(!this.collapsed());
}

ko.components.register('folke-submenu', {
    template: `<button data-bind="click:toggle, text: title"></button><!-- ko ifnot: collapsed --><ul data-bind="foreach: menu">
<li data-bind="visible: visible, component: { name: component, params: $data }"></li>
</ul><!-- /ko -->`,
    viewModel: SubMenuComponent
});
