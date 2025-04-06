"use client";

import { useForm } from "react-hook-form";

export default function TestForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <button type="submit">Submit</button>
    </form>
  );
} 