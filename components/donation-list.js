import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteDonationButton from "./delete-donation-button";

export default async function DonationList() {
  // initiate connection with database
  const supabase = await createClient()
  // selects all donations from 'donations' table and print in descending order based on the date
  const { data: donations, error } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('Supabase response', donations)


  return (
    <div className="p-20">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="">
              <td className="border border-gray-300 px-4 py-2">{donation.name}</td>
              <td className="border border-gray-300 px-4 py-2">{donation.type}</td>
              <td className="border border-gray-300 px-4 py-2">{donation.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(donation.created_at).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  <Link
                    href={`/edit-donation/${donation.id}`}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 px-3 rounded inline-block"
                  >
                    Edit
                  </Link>
                  <DeleteDonationButton donationId={donation.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}