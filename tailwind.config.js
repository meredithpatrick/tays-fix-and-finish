/**
 * Tays Fix and Finish — Tailwind CDN Config
 *
 * Load this script AFTER the Tailwind CDN <script> tag.
 * Maps 1:1 with tokens.css — keep both in sync when updating tokens.
 *
 * Usage in index.html:
 *   <script src="https://cdn.tailwindcss.com"></script>
 *   <script>
 *     window.tailwind.config = { ... } // same object as below
 *   </script>
 */
window.tailwind.config = {
  theme: {
    /* Replaces Tailwind default screens with brand breakpoints */
    screens: {
      'xs': '340px',
      'sm': '640px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      /* Brand color palette — maps to --colors-* in tokens.css */
      colors: {
        'black':       '#1a1a1a',
        'teal-dark':   '#2a4e51',
        'teal-med':    '#5f9798',
        'teal-bright': '#55c7cb',
        'teal':        '#b7d7d8',
        'white':       '#fefefe',
        'gray':        '#f4f4f4',
        'gray-dark':   '#546162',
        'gray-med':    '#acacac',
      },
      /* Brand spacing scale — maps to --sizing-* in tokens.css */
      spacing: {
        'sizing-0':  '0px',
        'sizing-1':  '4px',
        'sizing-2':  '8px',
        'sizing-3':  '12px',
        'sizing-4':  '16px',
        'sizing-5':  '24px',
        'sizing-6':  '32px',
        'sizing-7':  '40px',
        'sizing-8':  '48px',
        'sizing-9':  '56px',
        'sizing-10': '72px',
        'sizing-11': '80px',
        'sizing-12': '104px',
        'sizing-13': '120px',
        'sizing-14': '208px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
