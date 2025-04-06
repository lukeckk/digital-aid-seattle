"use client";

import Link from "next/link";
import { useForm } from "react-hook-form"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function DonationForm() {
  // Set up react-hook-form
  const {
    register, // to register each file compoenents
    handleSubmit, // to handle file submission
    formState: { errors },
    reset // to reset form after submission
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Set amount to null if it's empty
      const amount = data.amount === '' ? null : data.amount;

      const { error } = await supabase
        .from('donations')
        .insert([
          {
            name: data.name,
            type: data.type,
            amount: amount,
            created_at: new Date()
          }
        ])

      if (error) throw error

      // Reset form after successful submission
      reset()
      alert('Donation submitted successfully!')
    } catch (error) {
      console.error('Error submitting donation:', error)
      alert('Failed to submit donation. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Donation Form</h1>
        <Link href="./" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Return to Dashboard</Link>
      </div>
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
                required: false
              })}
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
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