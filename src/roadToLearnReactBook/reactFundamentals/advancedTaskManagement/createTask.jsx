import Form from "./formComponents/form";
import Input from "./formComponents/input";
import TextArea from "./formComponents/textarea";

const CreateTask = ({ formFields, onChange, onAddTask, isEditing }) => {
  const submit = (e) => {
    e.preventDefault();

    if (!formFields) {
      console.log("return");
      return;
    }
    onAddTask(formFields);
    console.log(formFields);
  };
  console.log("inside form", isEditing);
  return (
    <>
      <Form onSubmit={submit} label={isEditing ? "Edit Task" : "Add Task"}>
        <Input
          name="title"
          onChange={onChange}
          label="Title"
          value={formFields.title}
        />
        <TextArea
          name="description"
          onChange={onChange}
          label="Description"
          value={formFields.description}
        />
        <Input
          type="date"
          name="dueDate"
          onChange={onChange}
          label="Due Date"
          value={formFields.dueDate}
        />
      </Form>
    </>
  );
};

export default CreateTask;
