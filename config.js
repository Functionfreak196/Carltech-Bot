








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicURlUHVPcFpvRU42UDNEeHFYTGh0QTlFUjZ6WlJScmtwWmJFSC9aMVRFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0JWRXh2WTBmZVl1MDkzQkd4ZkFuMlNYRnY3U0dSUkc4OFhiVzFIUU9CND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSFF1REE4b3Z0Yms4TDQySWdRSnIwLzltc01YakZTcTFXWjhtRHBWV21VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0VFNNWWdmZDdCRVd1REtYa1BjNEJpOE9RN3U4TVRTMnlTTHBPK0tmblR3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVMT2tqQU9zL1FwQmhmbHNGOVlWdWI2dkdvbTNyZkpCRjlPNklIMDFlSFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNZlJ5T0tuN3hXeE9FRVJYbklScUFzWkdlTWFWMkZhVGJpblNtbXNXQkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdpazg0TTRwa0tWaE1EcEg5SDNGZks4SkVPalZlMFVyZlpEaE13VmNXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVdlTXhSSEM1S0cvalFRNXZqU0N4c2pSbURjVXJGSmpvcngwQWdLYXRpZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM4c0l6Rmw5SmF5M3lSa25ZTW0zbzgvTStnSmdUSDNkTGttTjcrMGRCQVZUSzI5MkV3MmxwTzQ5Y0VpMGFYVkltSTlRdGZLZnZwM0MycVJpckEyUUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJTSUpMcjRzSlk2bVlMWmtzWHJQODhjVk5xTGpCckNLUmZqRGZoSXhqb1RVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc4NjE4MjA2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFNjVCNUU1MDVGRERDQTdERDMyODZFMkFDMzZBRDQwRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxODg3NjIyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3ODYxODIwNjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDg4Rjk3ODkyMkJCQ0Q3MTE1RDNGNDVFMTQwRjJGQkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTg4NzYyMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNkJTbjAySFhRTXE1X2RaaFRUX1JnZyIsInBob25lSWQiOiI5ODEyMmI2MS01ZWVlLTQ2NGQtYjE2OC0yMzMzNTFkYTdjZjMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXd5RTdIeUNUekpYT3NvdnROL0ZaQVpzdm0wPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNzYUgvRkhaRWhMVzdwZ1A1VlJuM3E1eE1HTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFU1RLUUozVCIsIm1lIjp7ImlkIjoiMjU0Nzg2MTgyMDY2OjE2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkZ1bmN0aW9uX2ZyZWFrIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQcVo0Y0lERVBXd3pMNEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6RzhiWWY3NmVNV2FhNjMyZWJ6cDhUeWR3RXl5Ulp1Vm9KcER6b2xzOEc0PSIsImFjY291bnRTaWduYXR1cmUiOiJUcE1oS0FmWVBqWFNjUWd2RURaMVZJMEJ1c0hONlRxcitCM2F3VXVhSW9jMjN3VHJIdmo1TjFOODNOL21NaW5zQldlakhIOU91WHRYSEwvcmJabGRCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiejlWUjlkQ0U1RGhlaDZPMDJaQmZ5RXhmWUp4TEw1R2YvNTgzUTFTVGJ6SVdrRHcxZktCTnZLN2RjM2RmRXQ2bWw1OEh4cXFOUjFwT0o1aEpZVTVDQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3ODYxODIwNjY6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3h2RzJIKytuakZtbXV0OW5tODZmRThuY0JNc2tXYmxhQ2FRODZKYlBCdSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTg4NzYxOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLSzIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "🚀 ʙᴡᴍ xᴍᴅ", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
