"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DeleteDonationButton({ donationId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', donationId);

      if (error) {
        console.error('Error deleting donation:', error);
        alert('Failed to delete donation. Please try again.');
        setIsDeleting(false);
        return;
      }

      // Refresh the page to show updated list
      router.refresh();
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-block"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-block"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded inline-block"
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
} 