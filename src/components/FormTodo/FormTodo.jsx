import { Field, Form, Formik } from 'formik';
import style from './FormTodo.module.css';
import { FiSearch } from 'react-icons/fi';

const initialValues = {
  createTodo: '',
};
export default function FormTodo({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    const isTrimed = values.createTodo.trim();
    if (isTrimed === '') {
      return;
    }
    onSubmit(isTrimed);
    actions.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={style.form}>
        <button className={style.button} type="submit">
          <FiSearch size="16px" />
        </button>

        <Field
          className={style.input}
          placeholder="What do you want to write?"
          name="createTodo"
          required
          autoFocus
        />
      </Form>
    </Formik>
  );
}
