import { Field as BaseField, WrappedFieldProps } from "redux-form";
import * as React from "react";
import { TextField, Checkbox, RadioButtonGroup, SelectField, TextFieldProps } from "material-ui";

interface InputProps {
  type: string;
}
export default class Field extends BaseField<InputProps | TextFieldProps | {}> {}

export const RenderInput: React.SFC<WrappedFieldProps & InputProps> = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const RenderTextField : React.SFC<WrappedFieldProps> = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

export const RenderCheckbox: React.SFC<WrappedFieldProps> = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

export const RenderRadioGroup: React.SFC<WrappedFieldProps> = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

export const RenderSelectField: React.SFC<WrappedFieldProps> = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)