"use client";

import { useForm } from "react-hook-form"

export default function DonationForm() {
  // Set up react-hook-form
  const {
    register, // to register each file compoenents
    handleSubmit, // to handle file submission
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-center font-bold text-2xl p-20">Donation Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="p-2">Name</label>
            <input
              className="border-2 border-r-amber-200 w-full"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="p-2">Type</label>
            <select
              className="border-2 border-r-amber-200 w-full"
              {...register("type", { required: "Please select a donation type" })}
            >
              <option value="">Select a type</option>
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          <div>
            <label className="p-2">Amount</label>
            <input
              type="number"
              className="border-2 border-r-amber-200 w-full"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" }
              })}
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
        </div>
        <div className="p-20 flex justify-center">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}