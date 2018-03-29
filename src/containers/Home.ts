import { connect } from "react-redux";

import { State } from "../reducers";
import { listOfPosts } from "../selectors/sample3";
import { isLoading } from "../selectors/environment";
import Home, { HomeProps } from "../components/Home";

const mapStateToProps = (state: State): HomeProps => ({
  loading: isLoading(state),
  list: listOfPosts(state)
});
export default connect(mapStateToProps)(Home);
