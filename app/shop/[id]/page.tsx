import ClientShopPage from "./ClientShopPage";

// ✅ Generate static params for each product page
// Replace the array below with real product IDs from your API if needed
export async function generateStaticParams() {
  // Example IDs — you can fetch from API instead
  const products = ["1", "2", "3"];
  return products.map((id) => ({ id }));
}

export default function Page({ params }: { params: { id: string } }) {
  // This is a SERVER component that passes data to the CLIENT component
  return <ClientShopPage id={params.id} />;
}
