import React from 'react';
import type { FieldError } from 'react-hook-form';
import styles from './FormField.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, required, ...props }, ref) => (
    <div className={styles.field}>
      {label && <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
        </label>}
      <input ref={ref} className={styles.input} {...props} />
      <p className={styles.error}>{error?.message ?? ''}</p>
    </div>
  )
);
FormField.displayName = 'FormField';
