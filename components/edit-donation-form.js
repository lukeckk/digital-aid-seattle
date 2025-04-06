"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditDonationForm({ donationId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donation, setDonation] = useState(null);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Fetch donation data on component mount
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('id', donationId)
          .single();

        if (error) {
          console.error('Error fetching donation:', error);
          throw error;
        }

        setDonation(data);

        // Pre-fill form with donation data
        reset({
          name: data.name,
          type: data.type,
          amount: data.amount
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching donation:', error);
        setError(`Failed to load donation data: ${error.message}`);
        setIsLoading(false);
      }
    };

    if (donationId) {
      fetchDonation();
    } else {
      setError('No donation ID provided');
      setIsLoading(false);
    }
  }, [donationId, reset]);

  const onSubmit = async (data) => {
    try {
      // Set amount to null if it's empty
      const amount = data.amount === '' ? null : data.amount;

      const { error } = await supabase
        .from('donations')
        .update({
          name: data.name,
          type: data.type,
          amount: amount
        })
        .eq('id', donationId);

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      // Redirect back to donations list
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating donation:', error);
      setError(`Failed to update donation: ${error.message}`);
    }
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
        <div className="text-center text-red-500 p-6">{error}</div>
        <div className="flex justify-center">
          <Link href="/dashboard" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Edit Donation</h1>
        <Link href="/dashboard" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
          Return to Dashboard
        </Link>
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
                required: false,
                min: { value: 1, message: "Amount must be greater than 0" }
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
            Update Donation
          </button>
        </div>
      </form>
    </div>
  );
} 