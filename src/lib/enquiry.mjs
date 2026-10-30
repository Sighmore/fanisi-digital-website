export function whatsappUrl({ name, business = '', category, message }) {
  if (!name.trim() || !message.trim()) throw new Error('Please enter your name and enquiry.');
  const text = [`Hello Fanisi, my name is ${name.trim()}.`, business.trim() && `Business: ${business.trim()}`, `Enquiry: ${category}`, message.trim()].filter(Boolean).join('\n\n');
  return `https://wa.me/254114488930?text=${encodeURIComponent(text)}`;
}
