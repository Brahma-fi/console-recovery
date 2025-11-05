import { IconProps } from ".";

export default function ArrowDownIcon({
  width = 16,
  height = 16,
  color = "#E6E8ED",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_62441_5254)">
        <path
          d="M4.6665 6.6665L7.99984 9.99984L11.3332 6.6665H4.6665Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_62441_5254">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
