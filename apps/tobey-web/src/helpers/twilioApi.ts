const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
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
    // eslint-disable-next-line no-console -- TODO: use logger
    console.error(await response.text());
    throw new Error("Failed to send SMS");
  }
};
