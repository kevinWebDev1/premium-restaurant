/**
 * WhatsApp Order Dispatcher Utility
 * Spider Web Architecture - Human Confirmation Boundary
 *
 * Formats structured order requests for dine-in tables, ensuring:
 * 1. Multi-restaurant WhatsApp number decoupling
 * 2. Explicit table identification (?table=07)
 * 3. Human-in-the-loop: Framed strictly as an ORDER REQUEST pending staff acknowledgment
 */

export function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (e) {
    return `$${amount}`;
  }
}

export function generateWhatsAppOrder({
  restaurant,
  tableNumber = null,
  cartItems = [],
  guestNote = "",
}) {
  if (!restaurant) {
    throw new Error("Restaurant configuration is required to dispatch an order.");
  }

  const tableLabel = tableNumber ? `TABLE ${tableNumber.toUpperCase()}` : "DINE-IN GUEST (NO TABLE)";
  const currency = restaurant.currency || "USD";

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formattedSubtotal = formatCurrency(subtotal, currency);

  // Build itemized list
  const itemsText = cartItems
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity, currency)})`
    )
    .join("\n");

  const sanitizedNote = guestNote.trim()
    ? `\n📝 *Special Request / Allergy Note:*\n"${guestNote.trim()}"\n`
    : "";

  const message = [
    `🛎️ *ORDER REQUEST — ${tableLabel}*`,
    `Restaurant: ${restaurant.name}`,
    `────────────────────────`,
    itemsText,
    `────────────────────────`,
    `Subtotal (${cartItems.reduce((a, c) => a + c.quantity, 0)} items): ${formattedSubtotal}`,
    `Tax & Gratuity: Calculated at table`,
    `*Estimated Total: ${formattedSubtotal}*`,
    sanitizedNote,
    `────────────────────────`,
    `⚠️ *ORDER CONFIRMATION NOTICE:*`,
    `This is an order request. Please confirm receipt with the floor staff. Kitchen preparation begins upon staff acknowledgment.`,
    ``,
    `_Sent via ${restaurant.name} Digital QR Menu_`,
  ]
    .filter(Boolean)
    .join("\n");

  const rawPhone = restaurant.contact?.whatsappNumber || restaurant.contact?.phone || "";
  const cleanPhone = rawPhone.replace(/[^\d]/g, "");

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return {
    url,
    messageText: message,
    subtotal,
    formattedSubtotal,
    tableLabel,
  };
}

