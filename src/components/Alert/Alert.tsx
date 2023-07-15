import './alert.css';

function Alert({
  type,
  alert,
  setAlert,
  message,
  color,
}: {
  type: string;
  alert: boolean;
  setAlert: Function;
  message: string;
  color: string;
}) {
  return (
    <div className="top-50 absolute right-0">
      {alert && (
        <div className="flex items-center justify-center px-4 sm:px-0">
          <div
            id="alert"
            className={
              alert
                ? `right-0 top-0 mb-8 mt-12 items-center justify-between rounded-md ${color} fadeIn  px-4 py-4  shadow transition duration-150 ease-in-out md:flex lg:w-10/12`
                : `fadeOut`
            }
          >
            <div className="items-center sm:flex">
              <div className="flex items-end">
                <div className={`mr-2 mt-0.5 text-${color}-500 sm:mt-0`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={22}
                    height={22}
                    fill="currentColor"
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    />
                  </svg>
                </div>
                <p className={`mr-2 text-base font-bold text-${color}-500`}>
                  {type}
                </p>
              </div>
              <div
                className={`mr-2 hidden h-1 w-1 rounded-full ${color} xl:block`}
              />
              <p className={`text-base text-${color}-500`}>{message}</p>
            </div>
            <div className="mt-4 flex justify-end md:mt-0 md:pl-4 lg:pl-0">
              <span
                onClick={() => setAlert(!alert)}
                className="text-black-500 cursor-pointer text-sm"
              >
                Dismiss
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Alert;
