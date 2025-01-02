const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV_LENGTH = 16;

const generateIVFromText = (text) => {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    const iv = hash.digest().slice(0, IV_LENGTH); // Use first 16 bytes (128 bits) for IV
    return iv;
};

const encrypt = (text) => {
    if (!text) return null;
    
    const iv = generateIVFromText(text);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
    if (!text) return null;
    
    const textParts = text.split(':');
    if (textParts.length !== 2) return null;
    
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt
}; 