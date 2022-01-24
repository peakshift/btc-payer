// form
export type FormProps<T> = {
  defaultValues?: Partial<T>;
  initialValues?: T;
  isLoading?: boolean;
  onSubmit(values: T): void;
};
