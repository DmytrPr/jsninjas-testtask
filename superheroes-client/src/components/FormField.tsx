import { Field } from 'formik';
import React from 'react';

interface FormFieldProps {
    label?: string;
    touched?: boolean;
    error?: string;
    placeholder?: string;
    id: string;
    name: string;
}

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const FormField = ({
  label, touched, error, placeholder, id, name,
}: FormFieldProps) => (
  <>
    <label htmlFor={id}>
      {label || capitalizeFirst(name.split('_').join(' '))}
    </label>
    <Field id={id} name={name} placeholder={placeholder || ''} />
    {error && touched ? (
      <div>{error}</div>
    ) : null}
  </>
);
