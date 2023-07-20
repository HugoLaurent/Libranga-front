import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { facts } from '../../assets/facts/facts';
import { useAppDispatch } from '../../hooks/redux';
import { logUser, resetAddUserStatus } from '../../App/reducers/userReducer';
import Alert from '../../components/Alert/Alert';
import { useSelector } from 'react-redux';
function Login() {
  const dispatch = useAppDispatch();
  const [showpass, setShowPass] = useState(false);
  const [fact, setFact] = useState(0);
  const addUserStatus = useSelector((state) => state.users.logUserSuccess);
  const [alert, setAlert] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Réinitialiser addUserStatus à false lorsque vous êtes sur la page de connexion
    dispatch(resetAddUserStatus());
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * facts.length);
    setFact(facts[random]);
  }, []);

  useEffect(() => {
    if (addUserStatus) {
      setRedirectToLogin(true); // Définir la valeur de redirection sur true
    }
  }, [addUserStatus]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(logUser(formData));
    if (addUserStatus) {
      setRedirectToLogin(true);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  return (
    <>
      <Alert
        type="Failed"
        message="Something wrong happened! "
        alert={alert}
        setAlert={setAlert}
        color="bg-red-500"
      />
      {redirectToLogin && <Navigate to="/" replace={true} />}{' '}
      <div>
        <div className="items-center justify-center px-4 py-9 2xl:container sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:mx-auto">
          <div className="w-full rounded bg-white px-2 py-6 shadow-lg sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <p
              tabIndex={0}
              className="text-2xl font-extrabold leading-6 text-gray-800 focus:outline-none"
            >
              Login to your account
            </p>
            <p
              tabIndex={0}
              className="mt-4 text-sm font-medium leading-none text-gray-500 focus:outline-none"
            >
              Dont have account? <NavLink to="/signup">Sign up here</NavLink>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {' '}
                  Email{' '}
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-labelledby="email"
                  type="email"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="e.g: john@gmail.com "
                />
              </div>
              <div className="mt-6 w-full">
                <label
                  htmlFor="myInput"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {' '}
                  Password{' '}
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    required
                    id="myInput"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showpass ? 'text' : 'password'}
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800"
                  />
                  <div
                    onClick={() => setShowPass(!showpass)}
                    className="absolute right-0 mr-3 mt-2 cursor-pointer"
                  >
                    <div id="show">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                          fill="#71717A"
                        />
                      </svg>
                    </div>
                    <div id="hide" className="hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-eye-off"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#27272A"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={3} y1={3} x2={21} y2={21} />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  role="button"
                  className="w-full rounded border bg-indigo-700 py-4 text-sm font-semibold leading-none text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                >
                  Log in{' '}
                </button>
              </div>
            </form>
          </div>
          <div
            className="ml-8 mt-6 rounded-lg bg-center p-5 md:mt-0 md:w-1/2 lg:ml-16 xl:w-1/3"
            style={{
              backgroundImage: `url('${fact.URL}')`,
              opacity: 0.8, // Ajoutez l'opacité souhaitée ici
              backgroundSize: 'cover',
            }}
          >
            <p>Libranga</p>
            <div className="mt-8 flex items-start">
              <p className="rounded-md bg-black/70 p-2 pl-2.5 text-xl leading-7 text-white sm:text-2xl">
                "{fact.fact}"
              </p>
            </div>
            <div className="mt-10 flex items-center pl-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
