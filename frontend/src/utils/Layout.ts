type LayoutItem = LayoutItemObject | LayoutItemFolder;

interface LayoutItemBase {
  id: number;
  type: string;
  name: string;
}

class LayoutItemObject implements LayoutItemBase {
  public id: number;
  public type = 'basic';
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class LayoutItemFolder implements LayoutItemBase {
  public id: number;
  public name: string;
  public type = 'folder';
  public children: LayoutItem[] = new Array();

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Layout {
  public items: LayoutItem[] = new Array();

  constructor() {}
}
