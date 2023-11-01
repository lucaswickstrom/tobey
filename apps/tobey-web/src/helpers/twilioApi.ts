const TWILIO_ACCOUNT_SID = "AC73613709036ef01af13dc3f6b042e8c4";
const TWILIO_AUTH_TOKEN = "82488a5b8a9b371eee97b2b26ab43631";
const BASIC = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
const From = "Tobey";

const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

export const sendSms = async (to: string, body: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${BASIC}`,
    },
    body: new URLSearchParams({
      To: to,
      From,
      Body: body,
    }).toString(),
  });
  if (!response.ok) {
    throw new Error("Failed to send SMS");
  }
};
