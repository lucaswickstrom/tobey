import QRCode from "react-qr-code";
import { PhoneForm } from "./PhoneForm";

export function AppDownload() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Hämta Tobey-Appen</h3>
      <p className="text-center">Skanna QR-koden för att ladda ner appen</p>
      <QRCode
        className="mx-auto"
        size={160}
        value="https://tobey.io/download"
      />
      <p className="text-center">Eller få en nedladdningslänk via sms</p>
      <PhoneForm />
    </div>
  );
}
