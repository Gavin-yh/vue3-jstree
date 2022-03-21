interface Menu {
  name: string;
  type: "folder" | "file" | "all";
  onClick: (e: Event) => void;
}

export default class CreateMenu {
  fileMenu: HTMLElement;
  folderMenu: HTMLElement;

  constructor(menu: Array<Menu>) {
    this.fileMenu = this.createMenu(menu, "file");
    this.folderMenu = this.createMenu(menu, "folder");
  }

  /**
   *  创建菜单列表
   */
  createMenu(menus: Array<Menu>, flag: string) {
    const ul = document.createElement("ul");
    const body = document.querySelector("body")!;

    ul.classList.add("tree-custom-menu");

    for (let menu of menus) {
      if (menu.type === flag || menu.type === "all") {
        const li = document.createElement("li");
        li.textContent = menu.name;
        li.onclick = menu.onClick;
        ul.appendChild(li);
      }
    }

    body.appendChild(ul);

    return ul;
  }

  /**
   * 菜单显示
   */
  showMenu(e: MouseEvent, flag: any) {
    let target = {} as HTMLElement;

    if (flag === "floder") {
      target = this.folderMenu;
    }

    if (flag === "file") {
      target = this.fileMenu;
    }

    target.style.top = `${e.clientY}px`;
    target.style.left = `${e.clientX}px`;
    target.style.display = "block";
  }

  /**
   * 菜单隐藏
   */
  hiddenMenu(e: Event) {
    const folderMenu = this.folderMenu;
    const fileMenu = this.fileMenu;

    folderMenu.style.display = "none";
    fileMenu.style.display = "none";
  }
}
