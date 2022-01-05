import Tree from '../src/components/tree.vue'
import CreateMenu from '../src/util/createMenu';
import { mount } from '@vue/test-utils'

describe('文件树渲染', () => {
  it('文件目录渲染正常', () => {
    const data = [
      {
        text: "文件",
        children: [
          {
            text: "文件1",
            children: [
              {
                text: "文件1",
              }
            ],
          },
          {
            text: "文件3",
          },
          {
            text: "文件3",
          },
        ],
      },
      {
        text: "文件",
        children: [
          {
            text: "文件1",
            children: [
              {
                text: "文件1",
              },
            ],
          },
        ],
      },
      {
        text: "文件",
        children: [],
      },
    ]
    const wrapper = mount(Tree, {
      props: {
        data
      }
    })

    expect(wrapper.getComponent(Tree).props()).toEqual({ data: data })
  })

  it('自定义菜单创建成功', () => {
    const menu = new CreateMenu([
      {
        name: "新建目录",
        onClick: function (e) {
          menu.hiddenMenu(e);

          targetTree.value.children?.push(dir);

          inputAutoFocus(dir.id);
        },
      },
      {
        name: "新建文件",
        onClick: function (e) {
          menu.hiddenMenu(e);

          targetTree.value.children?.push(file);

          inputAutoFocus(file.id);
        },
      },
      {
        name: "重命名",
        onClick: function (e) {
          menu.hiddenMenu(e);
          targetTree.value.rename = !targetTree.value.rename;

          inputAutoFocus(targetTree.value.id);
        },
      },
      {
        name: "删除",
        onClick: function (e) {
          menu.hiddenMenu(e);

          targetTree.value.delete = !targetTree.value.delete;
        },
      },
    ]);

    expect(menu.menu.className).toContain('tree-custom-menu')
  })
})