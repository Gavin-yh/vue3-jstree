import { innerTreeData } from "./type";
/**
 * 排序文件和目录
 */
export function getSortData(data: innerTreeData[]) {
  const file = [];
  const folder = [];

  for (let i = 0; i < data.length; i++) {
    const treeItem = data[i];

    treeItem.children ? folder.push(treeItem) : file.push(treeItem);
  }

  return [...folder, ...file];
}
