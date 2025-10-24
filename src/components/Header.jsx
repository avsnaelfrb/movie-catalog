import "../style/Header.css";
import startIcon from "../assets/Polygon 1.png";
import addIcon from "../assets/+.png";

function Header() {
  const Durasi = "1h 20m";
  const JudulFilm = "Kimi No Nawa";
  const DeskripsiFilm ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.,";
  
  return (
    <div className="header">
      <div className="header-content">
        <p className="durasi">
          Durations : <span className="span-durasi">{Durasi}</span>
        </p>
        <h1 className="judul-film-header">{JudulFilm}</h1>
        <p className="deskripsi-film-header">
          {DeskripsiFilm}
        </p>
        <div className="Button-Group">
          <button className="btn btn-watch">
            <img src={startIcon} className="start-icon" />
            Watch Now
          </button>
          <button className="btn btn-add-list">
            <img src={addIcon} className="start-icon" />
            add list
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
