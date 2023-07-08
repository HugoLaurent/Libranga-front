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
        className={`${
          style[styleIndex]
            ? 'bg-blue-950 text-white'
            : 'border border-white bg-gray-50 text-gray-600'
        }  cursor-pointer rounded px-3 py-2.5  text-xs font-normal leading-3 shadow-md focus:outline-none `}
      >
        {title}
      </button>
    </li>
  );
}

export default NavigationButton;
