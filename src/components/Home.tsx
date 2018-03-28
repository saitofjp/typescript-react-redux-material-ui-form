import * as React from "react";
import CircularProgress from "material-ui/CircularProgress";
import CardExampleWithAvatar from "./examples/CardExampleWithAvatar";

export interface ListItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface HomeProps {
  list: Array<ListItem>;
  loading: boolean;
}

const Home = (props: HomeProps) => {
  const { list, loading } = props;
  
  if (loading) {
    return <CircularProgress />;
  }

  const posts = list.map(post => (
    <div key={post.id} className="col-xs" onClick={() => console.log(post)} >
      <CardExampleWithAvatar className="box" title={post.title} body={post.body} />
    </div>
  ));
  
  return (
    <div>
      <h2>Home</h2>
      <div>下までスクロールしてみよう・画面幅かえてみよう</div>
      <div className="row">{posts}</div>
    </div>
  );
};

export default Home;
