import DonationList from "@/components/donation-list"

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-center p-10 font-semibold text-2xl">Dashboard</h1>
      <DonationList />
    </div>
  )
}