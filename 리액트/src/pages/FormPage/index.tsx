import { SubmitHandler, useForm } from "react-hook-form";
import CaseRenderer from "./CaseRenderer";
import { ChangeEvent, ReactNode, useState } from "react";

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
          reset: (
            <FormCollections onClick={(type) => setCurrentCase(type)}>
              <ResetForm />
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
        <li className="" onClick={() => onClick("reset")}>
          Reset
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

type IDFields = {
  idFirstSection: string;
  idSecondSection: string;
};

function ResetForm() {
  const initialState: IDFields = {
    idFirstSection: "981126",
    idSecondSection: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<IDFields>({
    defaultValues: async () => {
      await new Promise((res) => setTimeout(res, 1000));
      return initialState;
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IDFields> = async (e) => {
    await new Promise((res) => setTimeout(res, 1000));
    alert(JSON.stringify(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-blue-300 flex flex-col">
        <p>isLoading : {isLoading ? "loading" : "not loading"}</p>
        <p>isSubmitting : {isSubmitting ? "submitting" : "not submitting"}</p>
      </div>

      <label>주민등록번호</label>
      <div className="flex">
        <input type="number" readOnly {...register("idFirstSection")} />
        <div>-</div>
        <input
          type="number"
          {...register("idSecondSection", {
            disabled: isSubmitting || isLoading,
            maxLength: { value: 6, message: "no longer than 6" },
            validate: (value) => {
              const regex = /^[1-9][0-9]*$/g;
              if (!regex.test(value)) {
                return "not valid";
              }
            },
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              const len = e.currentTarget.value.length;
              if (len === 7) {
                handleSubmit(onSubmit)().finally(reset);
              }
            },
          })}
        />
        <button>button</button>
      </div>
      <div className="flex flex-col bg-red-400">
        {errors.idFirstSection && <p>{errors.idFirstSection?.message}</p>}
        {errors.idSecondSection && <p>{errors.idSecondSection?.message}</p>}
      </div>
    </form>
  );
}
