const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconChevron = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCart = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...base} {...p}>
    <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.55L20.5 8H6" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="17.5" cy="20" r="1.3" />
  </svg>
);

export const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
  </svg>
);

export const IconMail = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
);

export const IconPin = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const IconBolt = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z" />
  </svg>
);

export const IconWhatsapp = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2s-.7 1-.9 1.2c-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-1 1-1.2 2.3-.5 3.7.9 1.9 2 3.4 3.7 4.7 2.6 1.9 4 1.7 5 1.6.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);

export const IconInstagram = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.7-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1a3 3 0 0 0-.8-1.2 3 3 0 0 0-1.2-.8c-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1z" />
    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM18.4 6.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
);

export const IconYoutube = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M23 12s0-3.2-.4-4.8a2.9 2.9 0 0 0-2-2C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.4a2.9 2.9 0 0 0-2 2C1 8.8 1 12 1 12s0 3.2.4 4.8c.2.9.9 1.7 2 2 1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.9 2.9 0 0 0 2-2C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
  </svg>
);

export const IconFacebook = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
  </svg>
);

export const IconTiktok = (p) => (
  <svg viewBox="0 0 50 50" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
  </svg>
);

export const socialIcon = {
  Instagram: IconInstagram,
  Youtube: IconYoutube,
  TikTok: IconTiktok,
  Facebook: IconFacebook,
};
