import getMatchWords from "./getMatchWords";

export const mailboxUrls = {
  "gmail.com": "https://mail.google.com",

  "outlook.com": "https://outlook.live.com",
  "hotmail.com": "https://outlook.live.com",
  "live.com": "https://outlook.live.com",
  "msn.com": "https://outlook.live.com",

  "yahoo.com": "https://mail.yahoo.com",

  "icloud.com": "https://www.icloud.com/mail",
  "me.com": "https://www.icloud.com/mail",
  "mac.com": "https://www.icloud.com/mail",

  "proton.me": "https://mail.proton.me",
  "protonmail.com": "https://mail.proton.me",

  "zoho.com": "https://mail.zoho.com",

  "gmx.com": "https://www.gmx.com",

  "mail.com": "https://www.mail.com",

  "aol.com": "https://mail.aol.com",

  "yandex.com": "https://mail.yandex.com",
};

export default function getUsersMailBoxUrl(email) {
    try {
        if (!email) throw new Error("Please Enter Email Address.")
       return getMatchWords(email,mailboxUrls)
       
    } catch (error) {
        console.log(error)
    }
}


