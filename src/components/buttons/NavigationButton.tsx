function NavigationButton({
  title,
  onClick,
  style,
  styleIndex,
}: {
  title: string;
  onClick: () => void;
  style: unknown[];
  styleIndex: number;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onClick();
          }
        }}
        className={`${
          style[styleIndex]
            ? 'whitespace-nowrap border border-blue-950 bg-blue-950 text-white'
            : 'border border-white bg-gray-50 text-gray-600'
        }  w-fit cursor-pointer whitespace-nowrap rounded px-3  py-2.5 text-xs font-normal leading-3 shadow-md focus:outline-none `}
      >
        {title}
      </button>
    </li>
  );
}

export default NavigationButton;
