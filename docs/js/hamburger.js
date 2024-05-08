/*
Class Active Hamburger - "hamburger_active"
Class Active Menu - "mobile-menu-active"
*/

class Hamburger {
    constructor(hamburger, menu, menuItems) {
        this.hamburger = this.getElement(hamburger);
        this.menu = this.getElement(menu);
        this.hamburgerActiveClass = 'hamburger_active';
        this.menuActiveClass = 'mobile-menu-active';
        this.body = document.querySelector('body');
        this.menuItems = this.getMenuItems(menuItems);
        this.init();
        this.toogleMenu();
    }

    isActive() {return this.hamburger.classList.contains(this.menuActiveClass);}

    getMenuItems = (menuItems) => {
        const selectorType = typeof menuItems;
        
        if (!['object', 'string'].includes(selectorType)) {
            throw new Error("Argument must be object or string");
        }

        if (typeof menuItems === 'object') {
            return menuItems;
        }

        const elements = document.querySelectorAll(menuItems);

        if (elements === null) {
            throw new Error(`There is no elements by selector: ${menuItems}`);
        }

        return elements;
    }

    getElement = (selector) => {
        const selectorType = typeof selector;
        
        if (!['object', 'string'].includes(selectorType)) {
            throw new Error("Argument must be object or string");
        }

        if (typeof selector === 'object') {
            return selector;
        }

        const element = document.querySelector(selector);

        if (element === null) {
            throw new Error(`There is no elements by selector: ${selector}`);
        }

        return element;
    }

    init = () => {
        this.hamburger.dataset.showMenu = false;
    }

    disableScrolling = () => {
        this.body.classList.add("disable-scroll")
    }
    
    enableScrolling = () => {
        this.body.classList.remove("disable-scroll");
    }

    toogleMenu = () => {
        this.hamburger.addEventListener('click', () => {
            if (this.hamburger.dataset.showMenu === 'false') {
                this.hamburger.dataset.showMenu = true;
                this.hamburger.classList.add(this.hamburgerActiveClass);
                this.menu.classList.add(this.menuActiveClass);
                console.log(this.menu.dataset.topOffset);
                this.menu.style.top = `${this.menu.dataset.topOffset}`;
                this.menu.style.height = `calc(100vh - ${this.menu.dataset.heightCorrection}px)`
                this.disableScrolling();
                
            } else {
                this.hamburger.dataset.showMenu = false;
                this.hamburger.classList.remove(this.hamburgerActiveClass);
                this.menu.classList.remove(this.menuActiveClass);
                this.enableScrolling();
            }
        })
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.hamburger.dataset.showMenu = false;
                this.hamburger.classList.remove(this.hamburgerActiveClass);
                this.menu.classList.remove(this.menuActiveClass);
                this.enableScrolling();
            })
        })
    }
}