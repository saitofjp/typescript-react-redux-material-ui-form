import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { State } from "../reducers";
import MaterialUiForm, {
  MaterialUiFormData,
  MaterialUiFormProps
} from "../components/MaterialUiForm";

import { saveData } from "../actions/sample2";

type Props = Pick<MaterialUiFormProps, "onSubmit"> &
             Pick<MaterialUiFormProps, "initialValues">;

export default connect(
  (state: State) => ({
    initialValues: {}
  }),
  (dispatch: Dispatch<State>) => ({
    onSubmit: (data: MaterialUiFormData) => {
      dispatch(saveData(data));
    }
  })
)(
  class extends React.Component<Props> {
    render() {
      const { initialValues, onSubmit } = this.props;
      return (
        <MaterialUiForm initialValues={initialValues} onSubmit={onSubmit} />
      );
    }
  }
);
