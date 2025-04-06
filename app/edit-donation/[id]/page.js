import EditDonationForm from "@/components/edit-donation-form";

export default function EditDonationPage({ params }) {
  // Log the params to verify the ID is being passed correctly
  console.log('Edit donation page params:', params);

  return (
    <div className="container mx-auto py-8">
      <EditDonationForm donationId={params.id} />
    </div>
  );
} 