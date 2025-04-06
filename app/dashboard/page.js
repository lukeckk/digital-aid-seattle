import DonationList from "@/components/donation-list"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-md p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-center p-10 font-semibold text-2xl">Dashboard</h1>
        <Link href="./dashboard/donations" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Donate Here!</Link>
      </div>
      <DonationList />
    </div>
  )
}