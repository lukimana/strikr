import FetchingIndicator from "@/components/atoms/FetchingIndicator";

export default function Loading() {
  return<div className="flex flex-col mt-10 min-h-screen">
    <FetchingIndicator
      textContent="Ai.Mi is searching for this information!"
      subTextContent="Please be patient, she's trying her best"
    />
  </div>
}