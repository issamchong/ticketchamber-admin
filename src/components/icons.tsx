export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...props}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M48.2,184.2,76,134.7a32,32,0,0,1,54.4-16.4l25.8,25.8a8,8,0,0,0,11.3,0l76.5-76.5a8,8,0,0,0-11.3-11.3L168,121.6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M72,184H208a8,8,0,0,0,8-8V96"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="48 152 48 184 80 184"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);
