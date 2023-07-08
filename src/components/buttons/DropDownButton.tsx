function DropDownButton({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <li className="cursor-pointer border border-gray-50 bg-gray-50 px-4 py-3 text-xs font-normal leading-3 text-gray-600 duration-100 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
      <button type="button" onClick={onClick}>
        {title}
      </button>
    </li>
  );
}

export default DropDownButton;
