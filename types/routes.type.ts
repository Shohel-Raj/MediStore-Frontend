export interface RouteItem {
  title: string;
  url: string;
  icon?: React.ElementType; // optional icon support
}

export interface Route {
  title: string; // group title
  items: RouteItem[];
}
