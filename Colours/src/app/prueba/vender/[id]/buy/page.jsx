

import BuyerInfoForm from "@/app/components/vendor/buyerForm"

export default function Page({ params }) {
  
  return (
    
    <BuyerInfoForm eventIdFromParams={params.id} />
  )
}