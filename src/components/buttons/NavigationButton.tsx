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
            ? '  bg-primary    text-white'
            : ' border-secondary bg-gray-50   text-gray-600'
        }  w-fit cursor-pointer whitespace-nowrap rounded border px-3
py-2.5 font-mainFont text-lg font-bold
uppercase leading-3 shadow-md
focus:outline-none `}
      >
        {title}
      </button>
    </li>
  );
}

export default NavigationButton;
