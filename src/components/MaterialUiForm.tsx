import { InjectedFormProps, FormErrors, reduxForm } from "redux-form";
import * as React from "react";
import Field, {
  RenderTextField,
  RenderRadioGroup,
  RenderSelectField,
  RenderCheckbox
} from "./FormField";
import { RadioButton, MenuItem } from "material-ui";


export interface MaterialUiFormData {
  firstName: string;
  lastName: string;
  email: string;
  favoriteColor: string;
  notes: string;
}

const validate = (values: MaterialUiFormData) => {
  const errors: FormErrors<MaterialUiFormData> = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "notes"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export interface MaterialUiFormProps extends InjectedFormProps<MaterialUiFormData> {
  onSubmit: (values: MaterialUiFormData) => void;
}

const MaterialUiForm: React.SFC<
  MaterialUiFormProps
> = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          name="firstName"
          component={RenderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field name="lastName" component={RenderTextField} label="Last Name" />
      </div>
      <div>
        <Field name="email" component={RenderTextField} label="Email" />
      </div>
      <div>
        <Field name="sex" component={RenderRadioGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field>
      </div>
      <div>
        <Field
          name="favoriteColor"
          component={RenderSelectField}
          label="Favorite Color"
        >
          <MenuItem value="ff0000" primaryText="Red" />
          <MenuItem value="00ff00" primaryText="Green" />
          <MenuItem value="0000ff" primaryText="Blue" />
        </Field>
      </div>
      <div>
        <Field name="employed" component={RenderCheckbox} label="Employed" />
      </div>
      <div>
        <Field
          name="notes"
          component={RenderTextField}
          label="Notes"
          multiLine={true}
          rows={2}
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm<MaterialUiFormData>({
  form: "materialUiForm",
  validate
})(MaterialUiForm);
