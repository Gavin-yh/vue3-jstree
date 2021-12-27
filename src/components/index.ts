export interface TreeData {
  text: string;
  icon?: string;
  opended?: boolean;
  selected?: boolean;
  isHover?: boolean;
  children?: Array<TreeData>;
}

export interface innerTreeData extends TreeData {
  id: number;
}
