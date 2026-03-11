import "./DupeCard.css";

function DupeCard({ name, brand, price, image, link }) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="card-body">
        <p className="card-brand">{brand}</p>
        <h3 className="card-name">{name}</h3>
        <p className="card-price">${price}</p>
        <a href={link} target="_blank" rel="noreferrer">
          <button className="card-btn">View Deal</button>
        </a>
      </div>
    </div>
  );
}

export default DupeCard;