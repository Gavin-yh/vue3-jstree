export interface TreeData {
  text: string;
  opended?: boolean;
  selected?: boolean;
  delete?: boolean;
  isHover?: boolean;
  rename?: boolean;
  children?: Array<TreeData>;
}

export interface innerTreeData extends TreeData {
  id: number;
  anchorID?: string;
}
