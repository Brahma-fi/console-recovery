import { IconProps } from ".";

export default function LinkArrowIcon({
  width = 16,
  height = 16,
  color = "#A8ADB5",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_62441_8079)">
        <path
          d="M7.33285 4V5.33333H9.72619L4.17285 10.8867L5.11285 11.8267L10.6662 6.27333V8.66667H11.9995V4H7.33285Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_62441_8079">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
