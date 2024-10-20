export default function PublicPropertyCard({ property }) {
  return (
    <>
      {property && (
        <div className="carousel-item">
          <div className="card w-64 hover:shadow-2xl">
            <figure>
              <img
                src={property.picUrls[0]}
                alt="PropertyPic"
                className="h-44 w-full object-cover rounded-lg"
              />
            </figure>
            <div className="p-4">
              <p className=" font-semibold leading-9">
                {property.city + ", " + property.country}
              </p>
              <h2 className="leading-6 text-slate-700">{property.title}</h2>
                          <p className=" text-slate-400">Guests: {property.maxNumGuests}</p>
              <div className="card-actions flex justify-between items-center">
                <p className=" font-semibold leading-9">{property.minPricePerNight} € night</p>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
