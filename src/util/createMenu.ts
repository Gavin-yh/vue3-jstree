interface Menu {
  name: string;
  onClick: (e: Event) => void;
}

export default class CreateMenu {
  menu: HTMLElement;
  constructor(menu: Array<Menu>) {
    this.menu = this.createMenu(menu);
  }

  /**
   *  创建菜单列表
   */
  createMenu(menus: Array<Menu>) {
    const ul = document.createElement("ul");
    ul.classList.add("tree-custom-menu");

    if (menus && menus.length > 0) {
      for (let menu of menus) {
        const li = document.createElement("li");
        li.textContent = menu.name;
        li.onclick = menu.onClick;
        ul.appendChild(li);
      }
    }
    const body = document.querySelector("body")!;
    body.appendChild(ul);
    return ul;
  }

  /**
   * 菜单显示
   */
  showMenu(e: MouseEvent) {
    const menus = this.menu;

    menus.style.top = `${e.clientY}px`;
    menus.style.left = `${e.clientX}px`;
    menus.style.display = "block";
  }

  /**
   * 菜单隐藏
   */
  hiddenMenu(e: Event) {
    const menus = this.menu;

    menus.style.display = "none";
  }
}
