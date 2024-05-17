import { IconSvgProps } from "@/types";

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const SystemIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z"
        fill="currentColor"
      ></path>{" "}
    </g>
  </svg>
);

export const SearchIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    height={size || height || 24}
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

export const UpVector = ({
  size,
  height,
  width,
  theme,
}: {
  size?: number;
  height?: number;
  width?: number;
  theme?: string;
}) => {
  const fill = theme === "dark" ? "#ffff" : "#1E88E5";

  return (
    <svg
      viewBox="0 0 24 24"
      width={size || width || 16}
      height={size || height || 16}
      id="up-direction"
      data-name="Flat Color"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-color"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="primary"
          d="M20.65,8.78,13.3,2.48a2,2,0,0,0-2.6,0L3.35,8.78a1,1,0,0,0-.11,1.41l2.6,3a1,1,0,0,0,.68.35,1.06,1.06,0,0,0,.73-.24L9,11.84V20a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V11.84l1.75,1.5a1.06,1.06,0,0,0,.73.24,1,1,0,0,0,.68-.35l2.6-3A1,1,0,0,0,20.65,8.78Z"
          fill={fill}
        ></path>
      </g>
    </svg>
  );
};

export const UserIcon = ({ size, height, width }: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || width || 16}
    height={size || height || 16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <circle
        cx="12"
        cy="6"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>{" "}
      <path
        d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>{" "}
    </g>
  </svg>
);

export const MailIcon = ({ size, height, width }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    width={size || width || 16}
    height={size || height || 16}
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

export const LockIcon = ({ size, height, width }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    width={size || width || 16}
    height={size || height || 16}
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
  >
    <path
      d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
      fill="currentColor"
    />
    <path
      d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
      fill="currentColor"
    />
  </svg>
);

export const ShoppingCart = ({ size, height, width }: IconSvgProps) => (
  <svg
    viewBox="0 -0.5 25 25"
    width={size || width || 16}
    height={size || height || 16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M5.24542 8.91722C5.1997 8.50553 4.8289 8.20886 4.41722 8.25458C4.00553 8.3003 3.70886 8.6711 3.75458 9.08278L5.24542 8.91722ZM5.413 17.221L4.66758 17.3038L4.66759 17.3039L5.413 17.221ZM7.4 19L7.39972 19.75H7.4V19ZM17.6 19L17.6001 18.25H17.6V19ZM19.588 17.221L20.3334 17.3039L20.3334 17.3037L19.588 17.221ZM21.2454 9.08269C21.2911 8.67101 20.9944 8.30024 20.5827 8.25457C20.171 8.2089 19.8002 8.50562 19.7546 8.91731L21.2454 9.08269ZM2.5 8.25C2.08579 8.25 1.75 8.58579 1.75 9C1.75 9.41421 2.08579 9.75 2.5 9.75V8.25ZM22.5 9.75C22.9142 9.75 23.25 9.41421 23.25 9C23.25 8.58579 22.9142 8.25 22.5 8.25V9.75ZM4.82918 8.66459C4.64394 9.03507 4.79411 9.48558 5.16459 9.67082C5.53507 9.85606 5.98558 9.70589 6.17082 9.33541L4.82918 8.66459ZM8.17082 5.33541C8.35606 4.96493 8.20589 4.51442 7.83541 4.32918C7.46493 4.14394 7.01442 4.29411 6.82918 4.66459L8.17082 5.33541ZM18.8292 9.33541C19.0144 9.70589 19.4649 9.85606 19.8354 9.67082C20.2059 9.48558 20.3561 9.03507 20.1708 8.66459L18.8292 9.33541ZM18.1708 4.66459C17.9856 4.29411 17.5351 4.14394 17.1646 4.32918C16.7941 4.51442 16.6439 4.96493 16.8292 5.33541L18.1708 4.66459ZM8.75 15C8.75 15.4142 9.08579 15.75 9.5 15.75C9.91421 15.75 10.25 15.4142 10.25 15H8.75ZM10.25 13C10.25 12.5858 9.91421 12.25 9.5 12.25C9.08579 12.25 8.75 12.5858 8.75 13H10.25ZM11.75 15C11.75 15.4142 12.0858 15.75 12.5 15.75C12.9142 15.75 13.25 15.4142 13.25 15H11.75ZM13.25 13C13.25 12.5858 12.9142 12.25 12.5 12.25C12.0858 12.25 11.75 12.5858 11.75 13H13.25ZM14.75 15C14.75 15.4142 15.0858 15.75 15.5 15.75C15.9142 15.75 16.25 15.4142 16.25 15H14.75ZM16.25 13C16.25 12.5858 15.9142 12.25 15.5 12.25C15.0858 12.25 14.75 12.5858 14.75 13H16.25ZM3.75458 9.08278L4.66758 17.3038L6.15842 17.1382L5.24542 8.91722L3.75458 9.08278ZM4.66759 17.3039C4.82238 18.6961 5.99892 19.7495 7.39972 19.75L7.40028 18.25C6.76356 18.2498 6.22877 17.771 6.15841 17.1381L4.66759 17.3039ZM7.4 19.75H17.6V18.25H7.4V19.75ZM17.5999 19.75C19.0012 19.7502 20.1786 18.6966 20.3334 17.3039L18.8426 17.1381C18.7722 17.7712 18.2371 18.2501 17.6001 18.25L17.5999 19.75ZM20.3334 17.3037L21.2454 9.08269L19.7546 8.91731L18.8426 17.1383L20.3334 17.3037ZM2.5 9.75H22.5V8.25H2.5V9.75ZM6.17082 9.33541L8.17082 5.33541L6.82918 4.66459L4.82918 8.66459L6.17082 9.33541ZM20.1708 8.66459L18.1708 4.66459L16.8292 5.33541L18.8292 9.33541L20.1708 8.66459ZM10.25 15V13H8.75V15H10.25ZM13.25 15V13H11.75V15H13.25ZM16.25 15V13H14.75V15H16.25Z"
        fill="currentColor"
      ></path>{" "}
    </g>
  </svg>
);

export const AddToShoppingCart = ({ size, height, width }: IconSvgProps) => (
  <svg
    version="1.1"
    id="_x32_"
    width={size || width || 16}
    height={size || height || 16}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <style type="text/css"> </style>{" "}
      <g>
        {" "}
        <path
          className="st0"
          d="M421.955,304.1c-49.73,0-90.045,40.315-90.045,90.045c0,49.73,40.315,90.045,90.045,90.045 c49.739,0,90.045-40.315,90.045-90.045C512,344.414,471.694,304.1,421.955,304.1z M473.415,409.154h-36.452v36.443h-30.009v-36.443 h-36.452v-30.018h36.452v-36.451h30.009v36.451h36.452V409.154z"
        ></path>{" "}
        <polygon
          className="st0"
          points="257.195,382.917 258.455,318.647 222.49,318.647 223.742,382.917 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="388.436,291.76 393.321,236.082 353.031,236.082 349.884,291.76 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="285.936,291.76 322.914,291.76 326.061,236.082 287.04,236.082 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="321.398,318.647 285.417,318.647 284.157,382.917 317.765,382.917 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="260.078,236.082 220.866,236.082 221.954,291.76 258.982,291.76 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="196.78,382.917 195.519,318.647 159.529,318.647 163.179,382.917 "
        ></polygon>{" "}
        <polygon
          className="st0"
          points="154.867,236.082 158.022,291.76 194.992,291.76 193.905,236.082 "
        ></polygon>{" "}
        <path
          className="st0"
          d="M107.51,382.917H136.2l-3.624-64.27H94.873l5.033,57.301C100.244,379.894,103.555,382.917,107.51,382.917z"
        ></path>{" "}
        <polygon
          className="st0"
          points="87.616,236.082 92.508,291.76 131.052,291.76 127.906,236.082 "
        ></polygon>{" "}
        <path
          className="st0"
          d="M98.093,410.694c-6.87,0-13.122-2.57-17.916-6.862c-4.786-4.3-8.015-10.231-8.764-17.069l-0.017-0.123 l-0.016-0.19L48.248,215.842h384.44l-9.68,71.437c8.287,0.082,16.319,1.177,24.062,3.048l10.47-77.236h2.241 c13.666,0,24.754-11.088,24.754-24.754v-11.616c0-13.674-11.088-24.753-24.754-24.753h-50.076h-39.977h-43.692l74.113-54.566 l-0.008-0.016c4.835-3.41,8.616-7.859,11.153-12.818c2.587-5.058,3.922-10.643,3.929-16.294c0-6.985-2.084-14.119-6.351-20.281 l0.009,0.008l-3.345-4.836l-0.016-0.008c-3.427-4.967-7.975-8.838-13.04-11.425c-5.059-2.587-10.635-3.922-16.286-3.922 c-6.994-0.008-14.128,2.076-20.273,6.351l-0.14,0.083l-147.214,108.39l0.017,0.008c-3.666,2.586-6.722,5.766-9.094,9.325h-84.683 H74.823H24.754C11.08,151.968,0,163.047,0,176.721v11.616c0,13.204,10.355,23.971,23.395,24.68l23.946,176.688h0.008 c1.474,12.8,7.636,24.128,16.632,32.184c9.061,8.138,21.097,13.056,34.112,13.056H323.17c-3.18-7.668-5.396-15.816-6.714-24.251 H98.093z M219.005,166.516c0.84-1.607,2.027-3.016,3.658-4.152l0.166-0.107L369.762,54.072c2.01-1.376,4.201-2.01,6.434-2.01 c1.82,0,3.633,0.428,5.239,1.26c1.614,0.824,3.032,2.019,4.168,3.649l-0.016-0.008l3.352,4.835v0.008 c1.392,2.018,2.027,4.209,2.034,6.466c0,1.812-0.428,3.625-1.26,5.239c-0.84,1.615-2.026,3.032-3.658,4.16l-0.132,0.091 l-146.959,108.2c-2.01,1.376-4.201,2.01-6.442,2.018c-1.813,0-3.624-0.437-5.239-1.268c-1.614-0.824-3.015-2.026-4.152-3.649 l-3.353-4.836v0.008c-1.392-2.018-2.018-4.218-2.026-6.475C217.753,169.95,218.182,168.13,219.005,166.516z"
        ></path>{" "}
      </g>{" "}
    </g>
  </svg>
);

export const LayoutOne = ({ size, height, width }: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || width || 16}
    height={size || height || 16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

export const LayoutSecond = ({ size, height, width }: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size || width || 16}
    height={size || height || 16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM12.75 4.5L13.5 3.75H19.5L20.25 4.5V10.5L19.5 11.25H13.5L12.75 10.5V4.5ZM14.25 5.25V9.75H18.75V5.25H14.25ZM3.75 13.5L4.5 12.75H10.5L11.25 13.5V19.5L10.5 20.25H4.5L3.75 19.5V13.5ZM5.25 14.25V18.75H9.75V14.25H5.25ZM12.75 13.5L13.5 12.75H19.5L20.25 13.5V19.5L19.5 20.25H13.5L12.75 19.5V13.5ZM14.25 14.25V18.75H18.75V14.25H14.25Z"
        fill="#080341"
      ></path>{" "}
    </g>
  </svg>
);
