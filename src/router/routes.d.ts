export default interface Route {
  component: React.FC;
  path: string;
  nav?: boolean;
  footer?: boolean;
}
