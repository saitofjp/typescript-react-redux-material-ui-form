import { ListItem } from "material-ui";

declare const CardPage: React.SFC<
  React.HTMLAttributes<HTMLElement> & { title: string; body: string }
>;
// declare const CardPage : React.SFC<{} & React.HTMLAttributes<HTMLDivElement>>;
export default CardPage;
