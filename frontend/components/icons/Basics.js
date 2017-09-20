import React from 'react';

export default function Basics(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 44" xmlnsXlink="http://www.w3.org/1999/xlink" width={45} height={44} {...props}>
      <defs>
        <polygon id="a" points="44.929 0 0 0 0 43.924 44.929 43.924" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="b" fill="white">
          <use xlinkHref="#a" />
        </mask>
        <path fill="#FFFFFF" d="M35.16 24.38a9.73 9.73 0 0 0-9.64 8.46h-6.1a9.7 9.7 0 0 0-1.78-4.43l5.77-5.54 5.7-5.48a9.68 9.68 0 0 0 6.05 2.15 9.78 9.78 0 0 0 0-19.54c-4.94 0-9 3.7-9.64 8.46h-6.1A9.76 9.76 0 0 0 0 9.77a9.78 9.78 0 0 0 9.77 9.77 9.72 9.72 0 0 0 9.64-8.46h6.11a9.69 9.69 0 0 0 1.77 4.43l-5.77 5.54-5.7 5.48a9.68 9.68 0 0 0-6.05-2.15 9.78 9.78 0 0 0 0 19.54c4.94 0 9-3.7 9.64-8.46h6.11a9.76 9.76 0 0 0 19.4-1.3 9.78 9.78 0 0 0-9.76-9.78M16.92 9.78a7.18 7.18 0 0 1-2 4.94 7.13 7.13 0 0 1-12.3-4.95 7.16 7.16 0 1 1 14.3 0m11.09 0a7.23 7.23 0 0 1 7.15-7.15 7.16 7.16 0 0 1 0 14.3 7.07 7.07 0 0 1-5.15-2.2 7.24 7.24 0 0 1-1.87-3.64 7.24 7.24 0 0 1-.13-1.3M16.92 34.14a7.16 7.16 0 1 1 0 0m18.24 7.16A7.15 7.15 0 1 1 35.19 27a7.15 7.15 0 0 1-.03 14.3" mask="url(#b)" />
      </g>
    </svg>
  );
}
