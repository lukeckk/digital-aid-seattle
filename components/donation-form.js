export default function DonationForm() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-4">Donation Form</h1>
      {/* name, type, amount, date */}
      <div className="grid grid-cols-2 gap-4">
        <label className="p-2">Name</label>
        <input className="border-2 border-r-amber-200" type="text" />

        <label className="p-2">Type</label>
        <select className="border-2 border-r-amber-200">
          <option>Money</option>
          <option>Food</option>
          <option>Clothing</option>
        </select>

        <label className="p-2">Amount</label>
        <input type="number" className="border-2 border-r-amber-200" />
      </div>
    </div>
  )
}