import { SubmitHandler, useForm } from "react-hook-form";
import CaseRenderer from "./CaseRenderer";
import { ReactNode, useState } from "react";

export default function FormPage() {
  const [currentCase, setCurrentCase] = useState("plain");
  return (
    <>
      <CaseRenderer
        currentCase={currentCase}
        cases={{
          plain: (
            <FormCollections onClick={(type) => setCurrentCase(type)}>
              <PlainForm />
            </FormCollections>
          ),
          hook: (
            <FormCollections onClick={(type) => setCurrentCase(type)}>
              <ReactHookForm />
            </FormCollections>
          ),
        }}
        defaultRender={<div>a</div>}
      />
    </>
  );
}

function FormCollections({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (type: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <ul className="flex gap-3 bg-red-200">
        <li className="" onClick={() => onClick("plain")}>
          Plain
        </li>
        <li className="" onClick={() => onClick("hook")}>
          React-Hook-Form
        </li>
      </ul>
    </div>
  );
}

function PlainForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("email"));
    console.log(formData.get("password"));
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">email</label>
      <input name="email" id="email" type="email" />

      <label htmlFor="password">password</label>
      <input name="password" id="password" type="password" />

      <input type="submit" />
    </form>
  );
}

type SignupFields = {
  name: string;
  age: number;
};

function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<SignupFields>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignupFields> = async (data: SignupFields) => {
    await new Promise((res) => setTimeout(res, 1000));
    alert(JSON.stringify(data));
  };

  const allFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>isDirty : {isDirty ? "dirty" : "clean"}</p>
      {errors.root?.message && <p>{errors.root.message}</p>}
      <label className="bg-red-300" htmlFor="name">
        name
      </label>
      <input
        {...register("name", {
          pattern: { value: /^[a-zA-Z]+$/g, message: "english alphabet only" },
        })}
        id="name"
        type="text"
      />
      <p>watch : {allFields.name}</p>
      {errors.name && <p>{errors.name.message}</p>}

      <label className="bg-red-300" htmlFor="age">
        age
      </label>
      <input
        {...register("age", {
          validate: (value) => {
            if (value > 10) {
              return "over";
            } else if (value < 0) {
              return "below";
            }
          },
        })}
        id="age"
        type="number"
      />
      <p>watch : {allFields.age}</p>
      {errors.age && <p>{errors.age.message}</p>}
      <input type="submit" />
    </form>
  );
}
