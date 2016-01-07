var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "knockout"], function (require, exports, ko) {
    var MenuButton = (function () {
        function MenuButton(title, action, order, visible, component, selected) {
            if (order === void 0) { order = 0; }
            if (visible === void 0) { visible = function () { return true; }; }
            if (component === void 0) { component = 'folke-menu-button'; }
            if (selected === void 0) { selected = function () { return false; }; }
            this.title = title;
            this.action = action;
            this.order = order;
            this.visible = visible;
            this.component = component;
            this.selected = selected;
        }
        return MenuButton;
    })();
    exports.MenuButton = MenuButton;
    var MenuRouteButton = (function () {
        function MenuRouteButton(title, route, order, visible, component, selected) {
            if (order === void 0) { order = 0; }
            if (visible === void 0) { visible = function () { return true; }; }
            if (component === void 0) { component = 'folke-menu-route-button'; }
            if (selected === void 0) { selected = function () { return false; }; }
            this.title = title;
            this.route = route;
            this.order = order;
            this.visible = visible;
            this.component = component;
            this.selected = selected;
        }
        return MenuRouteButton;
    })();
    exports.MenuRouteButton = MenuRouteButton;
    var Menu = (function () {
        function Menu() {
            this.menu = ko.observableArray();
        }
        Menu.prototype.addItem = function (menuItem) {
            var m = this.menu();
            var i;
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
        };
        Menu.prototype.addRouteButton = function (title, route) {
            this.addItem(new MenuRouteButton(title, route));
            return this;
        };
        Menu.prototype.addButton = function (title, action, order, visible) {
            if (order === void 0) { order = 0; }
            this.addItem(new MenuButton(title, action, order, visible));
            return this;
        };
        Menu.prototype.addSubMenu = function (title, order) {
            if (order === void 0) { order = 0; }
            return this.addItem(new SubMenu(title, order));
        };
        return Menu;
    })();
    exports.Menu = Menu;
    var SubMenu = (function (_super) {
        __extends(SubMenu, _super);
        function SubMenu(title, order, visible, component) {
            var _this = this;
            if (order === void 0) { order = 0; }
            if (visible === void 0) { visible = function () { return true; }; }
            if (component === void 0) { component = 'folke-submenu'; }
            _super.call(this);
            this.title = title;
            this.order = order;
            this.visible = visible;
            this.component = component;
            this.collapsed = ko.observable(true);
            this.action = function () { return _this.collapsed(!_this.collapsed()); };
        }
        return SubMenu;
    })(Menu);
    exports.SubMenu = SubMenu;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new Menu();
});
