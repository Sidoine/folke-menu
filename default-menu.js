define(["require", "exports", "knockout", "./menu"], function (require, exports, ko, Menu) {
    var MenuButtonComponent = (function () {
        function MenuButtonComponent(params) {
            this.title = params.title;
            this.action = params.action;
        }
        return MenuButtonComponent;
    })();
    var MenuRouteButtonComponent = (function () {
        function MenuRouteButtonComponent(params) {
            this.title = params.title;
            this.link = '#' + params.route;
        }
        return MenuRouteButtonComponent;
    })();
    var SubMenuComponent = (function () {
        function SubMenuComponent(params) {
            var _this = this;
            this.toggle = function () { return _this.collapsed(!_this.collapsed()); };
            this.menu = params.menu;
            this.collapsed = params.collapsed;
            this.title = params.title;
        }
        return SubMenuComponent;
    })();
    function register() {
        ko.components.register('folke-menu', {
            template: "<ul data-bind=\"foreach: menu\">\n<li data-bind=\"visible: visible, component: { name: component, params: $data }\"></li>\n</ul>",
            viewModel: { instance: Menu.default }
        });
        ko.components.register('folke-menu-button', {
            template: "<button data-bind=\"text: title, click: action\"></button>",
            viewModel: MenuButtonComponent
        });
        ko.components.register('folke-menu-route-button', {
            template: "<a data-bind=\"text: title, attr: { href: link }\"></span>",
            viewModel: MenuRouteButtonComponent
        });
        ko.components.register('folke-submenu', {
            template: "<div class=\"submenu\"><button data-bind=\"click:toggle, text: title\"></button><!-- ko ifnot: collapsed --><ul data-bind=\"foreach: menu\">\n<li data-bind=\"visible: visible, component: { name: component, params: $data }\"></li>\n</ul><!-- /ko --></div>",
            viewModel: SubMenuComponent
        });
    }
    exports.register = register;
});
