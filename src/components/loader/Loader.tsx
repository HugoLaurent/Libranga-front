import loader from '../../assets/image/loader.png';

function Loader() {
  return (
    <div className="Loader">
      <img src={loader} className="w-16 animate-spin" alt="loader" />
    </div>
  );
}

export default Loader;
